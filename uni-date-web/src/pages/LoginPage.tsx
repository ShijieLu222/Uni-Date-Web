import React from 'react';
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import LoginButton from '../components/LoginButton';

export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('登录信息：', { account, password });
  };
  
  return (
    <div>
      <Form>
        <FormInput
          label="账号"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          type={'text'}
          placeholder={'账号：'}
        />
        <FormInput
          label="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={'password'}
          placeholder={'密码：'}
        />
        <LoginButton
          label="登录"
          onClick={handleLogin}
        />
      </Form>

    </div>
  )
}