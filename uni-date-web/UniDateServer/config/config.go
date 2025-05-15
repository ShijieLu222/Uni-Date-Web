package config

import (
	"time"

	"github.com/spf13/viper"
)

// Config 应用配置结构体
type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
	JWT      JWTConfig
	Redis    RedisConfig
}

// ServerConfig 服务器配置
type ServerConfig struct {
	Port         string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

// DatabaseConfig 数据库配置
type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

// JWTConfig JWT 配置
type JWTConfig struct {
	Secret    string
	ExpiresIn time.Duration
}

// RedisConfig Redis 配置
type RedisConfig struct {
	Host     string
	Port     string
	Password string
	DB       int
}

// LoadConfig 从环境变量或配置文件中加载配置
func LoadConfig() (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()

	// 设置默认值
	setDefaults()

	// 尝试读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		// 如果配置文件不存在，使用环境变量
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, err
		}
	}

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, err
	}

	return &config, nil
}

// setDefaults 设置默认配置值
func setDefaults() {
	// 服务器默认配置
	viper.SetDefault("server.port", "8080")
	viper.SetDefault("server.readTimeout", time.Second*10)
	viper.SetDefault("server.writeTimeout", time.Second*10)

	// 数据库默认配置
	viper.SetDefault("database.host", "localhost")
	viper.SetDefault("database.port", "5432")
	viper.SetDefault("database.user", "postgres")
	viper.SetDefault("database.password", "postgres")
	viper.SetDefault("database.dbname", "unidate")
	viper.SetDefault("database.sslmode", "disable")

	// JWT 默认配置
	viper.SetDefault("jwt.secret", "your-secret-key")
	viper.SetDefault("jwt.expiresIn", time.Hour*24*7) // 7天

	// Redis 默认配置
	viper.SetDefault("redis.host", "localhost")
	viper.SetDefault("redis.port", "6379")
	viper.SetDefault("redis.password", "")
	viper.SetDefault("redis.db", 0)
}
