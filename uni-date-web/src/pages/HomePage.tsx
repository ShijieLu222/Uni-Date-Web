import React, { useState } from 'react';
import { Layout, message } from 'antd';
import UserCard from '../components/UserCard';

const { Content } = Layout;

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    name: '小明',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    gender: '男',
    university: '北京大学',
    major: '计算机科学',
    interests: ['编程', '篮球', '音乐'],
  },
  {
    id: '2',
    name: '小红',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    gender: '女',
    university: '清华大学',
    major: '人工智能',
    interests: ['阅读', '旅行', '摄影'],
  },
];

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    message.success('喜欢成功！');
    setCurrentIndex((prev) => (prev + 1) % mockUsers.length);
  };

  const handleDislike = () => {
    message.info('已跳过');
    setCurrentIndex((prev) => (prev + 1) % mockUsers.length);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ 
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <UserCard
          user={mockUsers[currentIndex]}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </Content>
    </Layout>
  );
};

export default HomePage;