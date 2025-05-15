-- 创建数据库
-- CREATE DATABASE unidate;

-- -- 连接到数据库
-- \c unidate;

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建用户表
CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20) UNIQUE,
  "account" VARCHAR(100) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(255),
  "birthdate" DATE,
  "gender" VARCHAR(10),
  "university" VARCHAR(100) NOT NULL,
  "major" VARCHAR(100),
  "photos" TEXT[],
  "interests" TEXT[],
  "is_verified" BOOLEAN DEFAULT FALSE,
  "is_vip" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "deleted_at" TIMESTAMP WITH TIME ZONE
);

-- 创建匹配表
CREATE TABLE IF NOT EXISTS "matches" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user1_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "user2_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "matched_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "is_active" BOOLEAN DEFAULT TRUE
);

-- 创建交互记录表
CREATE TABLE IF NOT EXISTS "interactions" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "from_user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "to_user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type" VARCHAR(10) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建消息表
CREATE TABLE IF NOT EXISTS "messages" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "match_id" UUID NOT NULL REFERENCES "matches"("id") ON DELETE CASCADE,
  "sender_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "receiver_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "content_type" VARCHAR(10) NOT NULL,
  "is_read" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建通知表
CREATE TABLE IF NOT EXISTS "notifications" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type" VARCHAR(20) NOT NULL,
  "content" TEXT NOT NULL,
  "is_read" BOOLEAN DEFAULT FALSE,
  "related_id" UUID,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_account ON users(account);
CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_interactions_users ON interactions(from_user_id, to_user_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX idx_notifications_user ON notifications(user_id); 