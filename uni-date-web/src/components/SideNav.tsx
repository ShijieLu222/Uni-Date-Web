import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const SideNav: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'chat',
      icon: <MessageOutlined />,
      label: '聊天',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '我的',
    },
  ];

  return (
    <Sider
      width={120}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{ background: '#fff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname.slice(1) || 'home']}
        style={{ height: '100%', borderRight: 0 }}
        onClick={({ key }) => navigate(`/${key}`)}
        items={menuItems}
      />
    </Sider>
  );
};

export default SideNav; 