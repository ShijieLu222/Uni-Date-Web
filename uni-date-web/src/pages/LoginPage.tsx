import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import LoginButton from '../components/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setUser } from '../redux/slices/userSlice';
import { userApi } from '../api/user';

export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!account || !password) {
      setError('账号和密码不能为空');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("开始登录请求, 账号:", account, "密码:", password);
      const response = await userApi.login({ account, password });
      console.log("登录结果:", response);
      
      if (response) {
        console.log("响应数据:", response);
        console.log("token:", response.token);
        console.log("user:", response.user);
        
        if (response.token && response.user) {
          console.log("保存token和user信息");
          localStorage.setItem('token', response.token);
          dispatch(setUser(response.user));
          navigate('/home');
        } else {
          console.log("响应中缺少token或user数据");
          setError('登录成功但返回数据不完整');
        }
      } else {
        console.log("登录响应为空");
        setError('登录失败，请检查账号和密码');
      }
    } catch (error) {
      console.error('登录出错:', error);
      setError('登录过程中出现错误');
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
              {error}
            </div>
          )}
          
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
            <LoginButton label={loading ? "登录中..." : "登录"} disabled={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}