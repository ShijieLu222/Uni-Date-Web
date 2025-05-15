package repositories

import (
	"errors"
	"fmt"

	"github.com/ShijieLu222/uni-date-server/internal/models"
	"github.com/ShijieLu222/uni-date-server/internal/repositories/db"
	"gorm.io/gorm"
)

// UserRepository 用户仓库接口
type UserRepository interface {
	Create(user *models.User) error
	GetByAccount(account string) (*models.User, error)
	GetByID(id string) (*models.User, error)
	Update(user *models.User) error
	CheckAccountExists(account string) (bool, error)
}

// userRepository 用户仓库实现
type userRepository struct {
	db *gorm.DB
}

// NewUserRepository 创建用户仓库实例
func NewUserRepository() UserRepository {
	return &userRepository{
		db: db.DB,
	}
}

// Create 创建新用户
func (r *userRepository) Create(user *models.User) error {
	// 暂时禁用密码加密，直接使用明文密码
	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	// if err != nil {
	// 	return err
	// }
	// user.Password = string(hashedPassword)

	// 直接使用明文密码
	fmt.Println("正在创建用户，使用明文密码:", user.Password)

	return r.db.Create(user).Error
}

// GetByAccount 通过账号查询用户
func (r *userRepository) GetByAccount(account string) (*models.User, error) {
	var user models.User
	if err := r.db.Where("account = ?", account).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

// GetByID 通过ID查询用户
func (r *userRepository) GetByID(id string) (*models.User, error) {
	var user models.User
	if err := r.db.Where("id = ?", id).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

// Update 更新用户信息
func (r *userRepository) Update(user *models.User) error {
	return r.db.Save(user).Error
}

// CheckAccountExists 检查账号是否已存在
func (r *userRepository) CheckAccountExists(account string) (bool, error) {
	var count int64
	err := r.db.Model(&models.User{}).Where("account = ?", account).Count(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}
