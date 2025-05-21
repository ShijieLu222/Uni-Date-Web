import React from 'react';
import { Card, Button, Avatar, Space, Typography } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    gender: string;
    university: string;
    major: string;
    interests: string[];
  };
  onLike: () => void;
  onDislike: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike }) => {
  return (
    <Card
      style={{
        width: 350,
        margin: '0 auto',
        borderRadius: 16,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}
      cover={
        <img
          alt={user.name}
          src={user.avatar}
          style={{ 
            height: 400, 
            objectFit: 'cover', 
            borderRadius: '16px 16px 0 0' 
          }}
        />
      }
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Space align="center">
          <Avatar size={64} src={user.avatar} />
          <div>
            <Title level={4} style={{ margin: 0 }}>{user.name}</Title>
            <Text type="secondary">{user.gender} · {user.university}</Text>
          </div>
        </Space>
        
        <div>
          <Text strong>专业：</Text>
          <Text>{user.major}</Text>
        </div>
        
        <div>
          <Text strong>兴趣：</Text>
          <Text>{user.interests.join('、')}</Text>
        </div>

        <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: 16 }}>
          <Button
            shape="circle"
            size="large"
            icon={<CloseOutlined />}
            danger
            onClick={onDislike}
            style={{ width: 60, height: 60 }}
          />
          <Button
            shape="circle"
            size="large"
            icon={<CheckOutlined />}
            type="primary"
            onClick={onLike}
            style={{ width: 60, height: 60 }}
          />
        </Space>
      </Space>
    </Card>
  );
};

export default UserCard; 