package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/uni-date-server/internal/models"
	"github.com/yourusername/uni-date-server/internal/services"
)

// UserController 用户控制器接口
type UserController interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	GetProfile(c *gin.Context)
	UpdateProfile(c *gin.Context)
	Logout(c *gin.Context)
}

// userController 用户控制器实现
type userController struct {
	userService services.UserService
}

// NewUserController 创建用户控制器实例
func NewUserController(userService services.UserService) UserController {
	return &userController{
		userService: userService,
	}
}

// 用户注册请求结构
type registerRequest struct {
	Account    string `json:"account" binding:"required"`
	Password   string `json:"password" binding:"required,min=6"`
	University string `json:"university" binding:"required"`
	FullName   string `json:"fullName" binding:"required"`
}

// 用户登录请求结构
type loginRequest struct {
	Account  string `json:"account" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Register 处理用户注册请求
func (c *userController) Register(ctx *gin.Context) {
	var req registerRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 创建用户对象
	user := &models.User{
		Account:    req.Account,
		Password:   req.Password,
		Name:       req.FullName,
		University: req.University,
		IsVerified: false,
		IsVIP:      false,
	}

	// 调用服务注册
	token, err := c.userService.Register(user)
	if err != nil {
		if err == services.ErrAccountExists {
			ctx.JSON(http.StatusConflict, gin.H{"error": "账号已存在"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "注册失败"})
		return
	}

	// 清除敏感信息
	user.Password = ""

	// 返回结果
	ctx.JSON(http.StatusCreated, gin.H{
		"token": token,
		"user":  user,
	})
}

// Login 处理用户登录请求
func (c *userController) Login(ctx *gin.Context) {
	var req loginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 调用服务登录
	token, user, err := c.userService.Login(req.Account, req.Password)
	if err != nil {
		if err == services.ErrInvalidCredentials {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "账号或密码错误"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "登录失败"})
		return
	}

	// 返回结果
	ctx.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}

// GetProfile 获取用户资料
func (c *userController) GetProfile(ctx *gin.Context) {
	// 从上下文中获取用户ID
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "未授权"})
		return
	}

	// 调用服务获取用户信息
	user, err := c.userService.GetUserByID(userID.(string))
	if err != nil {
		if err == services.ErrUserNotFound {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "用户不存在"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "获取用户信息失败"})
		return
	}

	// 返回结果
	ctx.JSON(http.StatusOK, user)
}

// UpdateProfile 更新用户资料
func (c *userController) UpdateProfile(ctx *gin.Context) {
	// 从上下文中获取用户ID
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "未授权"})
		return
	}

	// 解析请求体
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 设置用户ID
	user.ID = userID.(string)

	// 调用服务更新用户信息
	if err := c.userService.UpdateUserProfile(&user); err != nil {
		if err == services.ErrUserNotFound {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "用户不存在"})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "更新用户信息失败"})
		return
	}

	// 返回结果
	ctx.JSON(http.StatusOK, gin.H{"message": "用户信息更新成功"})
}

// Logout 处理用户登出请求
func (c *userController) Logout(ctx *gin.Context) {
	// 实际上，前端应该清除本地存储的token
	// 本方法主要是提供API一致性
	ctx.JSON(http.StatusOK, gin.H{"message": "登出成功"})
}
