package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/yourusername/uni-date-server/api/controllers"
	"github.com/yourusername/uni-date-server/api/middleware"
	"github.com/yourusername/uni-date-server/config"
)

// SetupRoutes 设置API路由
func SetupRoutes(r *gin.Engine, userController controllers.UserController, config *config.Config) {
	// 添加CORS中间件
	r.Use(middleware.CorsMiddleware())

	// API 路由组
	api := r.Group("/api")

	// 认证路由
	auth := api.Group("/auth")
	{
		auth.POST("/register", userController.Register)
		auth.POST("/login", userController.Login)
		auth.POST("/logout", userController.Logout)
	}

	// 用户路由（需要认证）
	user := api.Group("/user")
	user.Use(middleware.AuthMiddleware(config))
	{
		user.GET("/profile", userController.GetProfile)
		user.PUT("/profile", userController.UpdateProfile)
	}

	// 健康检查路由
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}
