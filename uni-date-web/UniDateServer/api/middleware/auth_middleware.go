package middleware

import (
	"net/http"
	"strings"

	"github.com/ShijieLu222/uni-date-server/config"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

// AuthMiddleware JWT认证中间件
func AuthMiddleware(config *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 从 Authorization 头获取 token
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未提供授权凭证"})
			c.Abort()
			return
		}

		// Bearer Token 格式检查
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "授权格式错误"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// 解析 token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// 验证签名方法
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(config.JWT.Secret), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "无效的令牌"})
			c.Abort()
			return
		}

		// 验证 token
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			// 将用户 ID 设置到上下文中
			userID, _ := claims["user_id"].(string)
			c.Set("user_id", userID)
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "无效的令牌"})
			c.Abort()
		}
	}
}
