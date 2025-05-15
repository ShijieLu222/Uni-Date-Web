package services

import (
	"errors"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/yourusername/uni-date-server/config"
	"github.com/yourusername/uni-date-server/internal/models"
	"github.com/yourusername/uni-date-server/internal/repositories"
)

var (
	ErrInvalidCredentials = errors.New("无效的用户名或密码")
	ErrAccountExists      = errors.New("账号已存在")
	ErrUserNotFound       = errors.New("用户不存在")
)

// UserService 用户服务接口
type UserService interface {
	Register(user *models.User) (string, error)
	Login(account, password string) (string, *models.User, error)
	GetUserByID(id string) (*models.User, error)
	UpdateUserProfile(user *models.User) error
}

// userService 用户服务实现
type userService struct {
	userRepo repositories.UserRepository
	config   *config.Config
}

// NewUserService 创建用户服务实例
func NewUserService(userRepo repositories.UserRepository, config *config.Config) UserService {
	return &userService{
		userRepo: userRepo,
		config:   config,
	}
}

// Register 用户注册
func (s *userService) Register(user *models.User) (string, error) {
	// 检查用户是否存在
	exists, err := s.userRepo.CheckAccountExists(user.Account)
	if err != nil {
		return "", err
	}
	if exists {
		return "", ErrAccountExists
	}

	// 创建用户
	if err := s.userRepo.Create(user); err != nil {
		return "", err
	}

	// 生成JWT令牌
	token, err := s.generateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// Login 用户登录
func (s *userService) Login(account, password string) (string, *models.User, error) {
	// 查找用户
	user, err := s.userRepo.GetByAccount(account)
	if err != nil {
		return "", nil, err
	}
	if user == nil {
		return "", nil, ErrInvalidCredentials
	}

	// 添加调试日志
	log.Printf("尝试登录 - 账号: %s", account)
	log.Printf("数据库中的密码: %s", user.Password)
	log.Printf("输入的密码: %s", password)

	// 简单的明文密码比较
	if user.Password != password {
		log.Printf("密码不匹配，明文比较失败")
		return "", nil, ErrInvalidCredentials
	}

	log.Printf("密码验证成功!")

	// 生成令牌
	token, err := s.generateToken(user.ID)
	if err != nil {
		return "", nil, err
	}

	// 返回用户时清除敏感信息
	user.Password = ""

	return token, user, nil
}

// GetUserByID 获取用户信息
func (s *userService) GetUserByID(id string) (*models.User, error) {
	user, err := s.userRepo.GetByID(id)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, ErrUserNotFound
	}

	// 清除敏感信息
	user.Password = ""

	return user, nil
}

// UpdateUserProfile 更新用户信息
func (s *userService) UpdateUserProfile(user *models.User) error {
	existingUser, err := s.userRepo.GetByID(user.ID)
	if err != nil {
		return err
	}
	if existingUser == nil {
		return ErrUserNotFound
	}

	// 更新不允许修改的字段
	user.Password = existingUser.Password
	user.Account = existingUser.Account

	return s.userRepo.Update(user)
}

// generateToken 生成JWT令牌
func (s *userService) generateToken(userID string) (string, error) {
	// 设置JWT声明
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(s.config.JWT.ExpiresIn).Unix(),
	}

	// 创建令牌
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 签名令牌
	return token.SignedString([]byte(s.config.JWT.Secret))
}
