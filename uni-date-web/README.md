# Uni-Date 校园交友应用

Uni-Date是一个专为大学生设计的校园交友应用，帮助同校或者不同学校的学生互相认识、交流和约会。

## 系统架构

本系统使用以下技术栈:

- 前端: React, Redux, TypeScript, Axios
- 后端: Go, Gin框架
- 数据库: PostgreSQL

## 项目结构

```
uni-date-web/
├── src/                # 前端源码
│   ├── api/            # API接口
│   ├── redux/          # Redux状态管理
│   ├── pages/          # 页面组件
│   ├── components/     # 可复用组件
│   └── types/          # TypeScript类型定义
└── UniDateServer/      # 后端服务
    ├── api/            # API控制器和路由
    ├── config/         # 配置文件
    ├── internal/       # 内部包
    │   ├── models/     # 数据模型
    │   ├── repositories/ # 数据存储层
    │   └── services/   # 业务逻辑层
    └── scripts/        # 脚本工具
```

## 环境要求

- Node.js 18.x+
- Go 1.24+
- PostgreSQL 14+

## 启动指南

### 1. 准备数据库

确保 PostgreSQL 已经启动并运行:

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### 2. 启动后端服务

```bash
cd UniDateServer
chmod +x ./scripts/start.sh
./scripts/start.sh
```

这个脚本会自动:
- 检查数据库是否存在，如果不存在则创建
- 编译和启动Go后端服务

后端服务将在 http://localhost:8080 运行。

### 3. 配置前端 API URL

在前端项目根目录创建 `.env` 文件:

```
REACT_APP_API_URL=http://localhost:8080
```

### 4. 启动前端应用

```bash
npm install
npm start
```

前端应用将在 http://localhost:3000 运行。

## API文档

### 认证API

- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录
- POST /api/auth/logout - 用户登出

### 用户API (需要认证)

- GET /api/user/profile - 获取用户资料
- PUT /api/user/profile - 更新用户资料

## 开发注意事项

1. 后端使用 JWT 进行认证，确保在请求头中加入 `Authorization: Bearer {token}`
2. 数据库使用 PostgreSQL，确保已正确配置连接参数
3. 确保前端 API 请求使用了正确的 URL 前缀

## 故障排除

1. 如果数据库连接失败，检查 UniDateServer/config/config.yaml 中的数据库配置
2. 如果前端 API 请求失败，确保 .env 文件中的 REACT_APP_API_URL 设置正确
3. 前后端跨域问题已在后端通过 CORS 中间件解决
