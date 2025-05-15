package models

import (
	"time"

	"gorm.io/gorm"
)

// User 用户模型
type User struct {
	ID         string         `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name       string         `json:"name" gorm:"size:100;not null"`
	Phone      string         `json:"phone" gorm:"size:20;uniqueIndex"`
	Account    string         `json:"account" gorm:"size:100;uniqueIndex;not null"`
	Password   string         `json:"password,omitempty" gorm:"size:255;not null"`
	Avatar     string         `json:"avatar" gorm:"size:255"`
	Birthdate  string         `json:"birthdate" gorm:"type:date"`
	Gender     string         `json:"gender" gorm:"size:10"`
	University string         `json:"university" gorm:"size:100;not null"`
	Major      string         `json:"major" gorm:"size:100"`
	Photos     []string       `json:"photos" gorm:"type:text[]"`
	Interests  []string       `json:"interests" gorm:"type:text[]"`
	IsVerified bool           `json:"isVerified" gorm:"default:false"`
	IsVIP      bool           `json:"isVIP" gorm:"default:false"`
	CreatedAt  time.Time      `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt  time.Time      `json:"updatedAt" gorm:"autoUpdateTime"`
	DeletedAt  gorm.DeletedAt `json:"-" gorm:"index"`
}

// Match 匹配模型
type Match struct {
	ID        string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	User1ID   string    `json:"user1Id" gorm:"type:uuid;not null"`
	User2ID   string    `json:"user2Id" gorm:"type:uuid;not null"`
	MatchedAt time.Time `json:"matchedAt" gorm:"autoCreateTime"`
	IsActive  bool      `json:"isActive" gorm:"default:true"`
	User1     User      `json:"-" gorm:"foreignKey:User1ID"`
	User2     User      `json:"-" gorm:"foreignKey:User2ID"`
}

// Interaction 用户交互模型
type Interaction struct {
	ID         string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	FromUserID string    `json:"fromUserId" gorm:"type:uuid;not null"`
	ToUserID   string    `json:"toUserId" gorm:"type:uuid;not null"`
	Type       string    `json:"type" gorm:"size:10;not null"` // 'like' or 'dislike'
	CreatedAt  time.Time `json:"createdAt" gorm:"autoCreateTime"`
	FromUser   User      `json:"-" gorm:"foreignKey:FromUserID"`
	ToUser     User      `json:"-" gorm:"foreignKey:ToUserID"`
}

// Message 消息模型
type Message struct {
	ID          string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	MatchID     string    `json:"matchId" gorm:"type:uuid;not null"`
	SenderID    string    `json:"senderId" gorm:"type:uuid;not null"`
	ReceiverID  string    `json:"receiverId" gorm:"type:uuid;not null"`
	Content     string    `json:"content" gorm:"type:text;not null"`
	ContentType string    `json:"contentType" gorm:"size:10;not null"` // 'text', 'image', 'emoji'
	IsRead      bool      `json:"isRead" gorm:"default:false"`
	CreatedAt   time.Time `json:"createdAt" gorm:"autoCreateTime"`
	Match       Match     `json:"-" gorm:"foreignKey:MatchID"`
	Sender      User      `json:"-" gorm:"foreignKey:SenderID"`
	Receiver    User      `json:"-" gorm:"foreignKey:ReceiverID"`
}

// Notification 通知模型
type Notification struct {
	ID        string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID    string    `json:"userId" gorm:"type:uuid;not null"`
	Type      string    `json:"type" gorm:"size:20;not null"` // 'match', 'message', 'like', 'system'
	Content   string    `json:"content" gorm:"type:text;not null"`
	IsRead    bool      `json:"isRead" gorm:"default:false"`
	RelatedID string    `json:"relatedId" gorm:"type:uuid"`
	CreatedAt time.Time `json:"createdAt" gorm:"autoCreateTime"`
	User      User      `json:"-" gorm:"foreignKey:UserID"`
}
