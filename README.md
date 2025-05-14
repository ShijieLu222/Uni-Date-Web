# Uni-Date 大学生交友平台

## 项目概述

Uni-Date是一个专为大学生设计的交友平台，旨在帮助大学生找到志同道合的朋友或伴侣。该平台借鉴了Tinder和Bumble的交互模式，提供简洁直观的用户界面和丰富的社交功能。

### 核心功能

- **用户认证**：确保只有大学生才能注册和使用平台
- **个人资料**：展示用户的基本信息、兴趣爱好和照片
- **匹配系统**：基于用户偏好和兴趣进行智能匹配
- **即时通讯**：提供实时聊天功能，促进用户交流
- **VIP功能**：提供高级功能，如查看谁喜欢了你、无限匹配等

## 技术栈

### 前端
- **React Native**：用于构建跨平台的移动应用
- **TypeScript**：提供类型安全和更好的开发体验
- **Redux**：状态管理
- **React Navigation**：页面导航
- **Socket.io-client**：实时通讯

### 后端
- **Go**：高性能的后端服务
- **Gin**：Web框架
- **PostgreSQL**：关系型数据库
- **Redis**：缓存和会话管理
- **WebSocket**：实时通讯

## 模块化开发计划

### 阶段一：基础架构和认证系统
1. ✅ 搭建前端和后端项目结构 - [查看详细步骤](./搭建前端和后端.md)
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

## 页面详细设计

### 登录页面（Login Page）
- 学生邮箱登录
- 手机号验证
- 社交媒体登录（可选）
- 忘记密码功能
- 新用户注册入口

### 主页（Home Page）
- 卡片式用户展示（类似Tinder）
- 左右滑动进行喜欢/不喜欢选择
- 匹配通知
- 筛选功能（按兴趣、学校、专业等）

### 个人资料页面（Profile Page）
- 个人信息展示和编辑
- 照片上传和管理
- 兴趣标签设置
- 隐私设置
- VIP状态显示

### 聊天页面（Chat Page）
- 匹配列表
- 一对一聊天界面
- 消息通知
- 图片和表情发送
- 聊天记录搜索

## 数据类型定义（TypeScript）

```typescript
// 用户基本信息
interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  birthdate: Date;
  gender: 'male' | 'female';
  university: string;
  major?: string;
  bio?: string;
  photos: string[];
  interests: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  isVIP: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 用户偏好设置
interface UserPreference {
  userId: string;
  ageRange: {
    min: number;
    max: number;
  };
  genderPreference: ('male' | 'female')[];
  maxDistance: number;
  universityPreference?: string[];
  interestPreference?: string[];
}

// 匹配记录
interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  matchedAt: Date;
  isActive: boolean;
}

// 用户交互记录
interface Interaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'like' | 'dislike' | 'superlike';
  createdAt: Date;
}

// 消息
interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: 'text' | 'image' | 'emoji';
  isRead: boolean;
  createdAt: Date;
}

// 通知
interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'like' | 'system';
  content: string;
  isRead: boolean;
  relatedId?: string;
  createdAt: Date;
}

// VIP订阅
interface Subscription {
  id: string;
  userId: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  paymentMethod: string;
  amount: number;
}
```

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