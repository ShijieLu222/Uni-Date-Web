package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/uni-date-server/api/controllers"
	"github.com/yourusername/uni-date-server/api/routes"
	"github.com/yourusername/uni-date-server/config"
	"github.com/yourusername/uni-date-server/internal/repositories"
	"github.com/yourusername/uni-date-server/internal/repositories/db"
	"github.com/yourusername/uni-date-server/internal/services"
)

func main() {
	// 加载配置
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("加载配置失败: %v", err)
	}

	// 初始化数据库
	_, err = db.InitDB(cfg)
	if err != nil {
		log.Fatalf("数据库连接失败: %v", err)
	}

	// 注释掉自动迁移，因为数据库表已经手动创建
	// if err := db.AutoMigrate(database); err != nil {
	// 	log.Fatalf("数据库迁移失败: %v", err)
	// }

	// 初始化存储库
	userRepo := repositories.NewUserRepository()

	// 初始化服务
	userService := services.NewUserService(userRepo, cfg)

	// 初始化控制器
	userController := controllers.NewUserController(userService)

	// 设置 Gin 路由
	router := gin.Default()

	// 配置路由
	routes.SetupRoutes(router, userController, cfg)

	// 启动服务器
	serverAddr := fmt.Sprintf(":%s", cfg.Server.Port)
	fmt.Printf("服务器运行在 http://localhost%s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("启动服务器失败: %v", err)
	}
}
