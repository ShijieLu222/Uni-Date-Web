import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import LoginButton from '../components/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setUser } from '../redux/slices/userSlice';

export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = {
      id: '1',
      name: '小明', 
      phone: '18017823680',
      account: 'xiaoming',
      password: '123456',
      birthdate: '2005-01-01',
      gender: 'male',
      university: '清华大学',
      major: '计算机',
      photos: [],
      interests: ['拉屎', '打篮球'],
      avatar: 'https://example.com/avatar.jpg',
      isVerified: true,
      isVIP: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch(setUser(mockUser)); // 触发 action 设置 user
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          padding: '40px 32px',
          minWidth: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backdropFilter: 'blur(6px)',
        }}
      >
        <h2 style={{marginBottom: 32, color: '#222', letterSpacing: 2}}>Uni-Date</h2>
        <form onSubmit={handleLogin} style={{width: '100%'}}>
          <FormInput
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            type="text"
            placeholder="账号："
          />
          <FormInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="密码："
          />
          <div style={{marginTop: 16, width: '100%', display: 'flex', justifyContent: 'center'}}>
            <LoginButton label="登录" />
          </div>
        </form>
      </div>
    </div>
  );
}