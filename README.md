# Uni-Date 大学生交友平台

## 项目概述

Uni-Date 是一个专为大学生设计的交友平台，旨在帮助大学生找到志同道合的朋友或伴侣。该平台借鉴了 Tinder 和 Bumble 的交互模式，提供简洁直观的用户界面和丰富的社交功能。

## 🎯 项目目标

* ✅ 实现大学生身份验证，确保用户真实
* ✅ 支持卡片滑动匹配机制
* ✅ 提供一对一实时聊天功能
* ✅ 支持兴趣筛选与算法推荐
* ✅ 后续拓展 VIP 功能与原生 App

---
## 🧱 技术栈

### 前端

| 技术               | 用途               |
| ---------------- | -------------       |
| React Native     | 跨平台 App/网页开发    |
| TypeScript       | 类型安全 + 提升代码质量 |
| Redux Toolkit    | 全局状态管理          |
| React Navigation | 页面导航与跳转控制     |
| Socket.io-client | 实时通讯             |
| Axios            | API 请求处理         |

### 后端

| 技术          | 用途          |
| ----------- | -----------    |
| Go (Golang) | 高性能后端语言   |
| Gin         | 轻量 Web 框架   |
| PostgreSQL  | 主关系数据库     |
| Redis       | 缓存/会话存储    |
| WebSocket   | 实时通讯 (聊天模块) |
| JWT         | 用户认证        |

---

## 🚧 模块化开发进度（按阶段）

### ✅ 阶段一：基础认证系统（进行中）

* [x] 前端项目结构搭建
* [x] 后端项目初始化
* [x] 登录页面基本搭建
* [ ] Redux 用户状态管理集成
* [ ] 登录功能后端连接并测试
* [ ] 数据库填充测试用户数据

> 💡 当前建议：**先完善 Redux + 后端登录连接 → 验证登录流程完全可用 → 再逐步拓展首页/聊天等页面开发。**

### ⏳ 阶段二：核心页面开发

* [ ] 首页 Home Page（展示匹配推荐卡片）
* [ ] Profile Page（编辑/浏览个人资料）
* [ ] Chat Page（聊天 UI + 实时通信）

### ⏳ 阶段三：匹配系统和通讯

* [ ] 匹配推荐逻辑
* [ ] Socket 实现消息实时发送与接收
* [ ] 消息数据库保存 + 推送提醒

### ⏳ 阶段四：VIP系统及后续扩展

* [ ] VIP订阅功能
* [ ] 高级筛选功能
* [ ] 多端（APP）部署打包

---

## 🖥️ 页面设计与功能概览

### Login Page 登录页

* 邮箱/手机号/社交方式登录
* 密码找回
* 用户注册验证
* 验证码（邮箱/短信）

### Home Page 首页

* Tinder 风格滑动卡片
* 展示用户照片、兴趣、简介
* 点赞/不喜欢/超级喜欢
* 匹配成功弹窗

### Profile Page 个人资料页

* 用户基础资料展示与修改
* 兴趣、照片上传
* 学校认证、隐私设置
* 查看访客 / 点赞记录（VIP）

### Chat Page 聊天页

* 匹配用户列表
* 一对一实时聊天
* 图片/emoji发送
* 消息已读状态


## 🧪 测试建议

* 单元测试（Go + Jest）
* 使用 mock 数据库做集成测试
* 自动化测试流程：CI/CD（GitHub Actions）


功能

- **用户认证**：确保只有大学生才能注册和使用平台
- **个人资料**：展示用户的基本信息、兴趣爱好和照片
- **匹配系统**：基于用户偏好和兴趣进行智能匹配
- **即时通讯**：提供实时聊天功能，促进用户交流
- **VIP功能**：提供高级功能，如查看谁喜欢了你、无限匹配等


## 模块化开发计划

### 阶段一：基础架构和认证系统
1.搭建前端和后端项目结构 - [查看详细步骤](./搭建前端和后端.md)
2. 实现用户注册和登录功能
3. 设计和实现数据库模型

### 阶段二：核心页面开发
1. 开发登录页面（Login Page）
2. 开发主页（Home Page）
3. 开发个人资料页面（Profile Page）
4. 开发聊天页面（Chat Page）

### 阶段三：匹配系统和即时通讯
1. 实现用户匹配算法
2. 开发即时通讯功能
3. 集成推送通知

### 阶段四：VIP功能和优化
1. 实现VIP功能
2. 性能优化和用户体验改进
3. 安全性增强


## 后端API设计

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/verify` - 验证用户身份
- `POST /api/auth/reset-password` - 重置密码

### 用户相关
- `GET /api/users/profile` - 获取当前用户资料
- `PUT /api/users/profile` - 更新用户资料
- `POST /api/users/photos` - 上传照片
- `DELETE /api/users/photos/:id` - 删除照片
- `PUT /api/users/preferences` - 更新用户偏好设置

### 匹配相关
- `GET /api/matches/recommendations` - 获取推荐用户
- `POST /api/matches/interactions` - 创建用户交互（喜欢/不喜欢）
- `GET /api/matches` - 获取所有匹配
- `DELETE /api/matches/:id` - 取消匹配

### 聊天相关
- `GET /api/chats` - 获取所有聊天
- `GET /api/chats/:matchId/messages` - 获取特定匹配的消息
- `POST /api/chats/:matchId/messages` - 发送消息
- `PUT /api/chats/messages/:id/read` - 标记消息为已读

### VIP相关
- `GET /api/subscriptions` - 获取订阅信息
- `POST /api/subscriptions` - 创建新订阅
- `PUT /api/subscriptions/:id` - 更新订阅
- `DELETE /api/subscriptions/:id` - 取消订阅

## 开发环境设置

### 前端
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

### 后端
```bash
# 安装依赖
go mod download

# 启动开发服务器
go run main.go

# 构建生产版本
go build
```

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

本项目采用GNU通用公共许可证 - 详情请参阅LICENSE文件