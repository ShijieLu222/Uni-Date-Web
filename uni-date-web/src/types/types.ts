interface User {
    id: string;
    name: string;
    phone: string;
    account: string;
    password: string;
    birthdate: string;
    gender: string;
    university: string;
    major: string;
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

// interface UserPreference {
//     userId: string;
//     ageRange: {
//       min: number;
//       max: number;
//     };
//     genderPreference: ('male' | 'female')[];
//     maxDistance: number;
//     universityPreference?: string[];
//     interestPreference?: string[];
//   }

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
    type: 'like' | 'dislike' ;  //| 'superlike'
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

//   // VIP订阅
// interface Subscription {
//     id: string;
//     userId: string;
//     plan: 'monthly' | 'yearly' | 'lifetime';
//     startDate: Date;
//     endDate?: Date;
//     isActive: boolean;
//     paymentMethod: string;
//     amount: number;
//   }