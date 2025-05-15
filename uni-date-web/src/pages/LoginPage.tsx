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
      const response = await userApi.login({ account, password });
      
      if (response && response.user && response.token) {
        localStorage.setItem('token', response.token);
        
        dispatch(setUser(response.user));
        
        navigate('/home');
      } else {
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