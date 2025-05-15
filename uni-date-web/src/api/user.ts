import { User, LoginResponse } from '../types/types';
import request from './utils/request';

interface LoginParams {
  account: string;
  password: string;
}

interface RegisterParams extends LoginParams {
  // email: string;
  university: string;
  fullName: string;
}

// 用户相关的 API 接口
export const userApi = {
  // 登录
  login: async (params: LoginParams): Promise<LoginResponse | null> => {
    try {
      const { data } = await request.post('/api/auth/login', params);
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  },

  // 注册
  register: async (params: RegisterParams): Promise<LoginResponse | null> => {
    try {
      const { data } = await request.post('/api/auth/register', params);
      return data;
    } catch (error) {
      console.error('Registration failed:', error);
      return null;
    }
  },

  // 获取用户信息
  getUserProfile: async (): Promise<User | null> => {
    try {
      const { data } = await request.get('/api/user/profile');
      return data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  },

  // 更新用户信息
  updateUserProfile: async (profile: Partial<User>): Promise<User | null> => {
    try {
      const { data } = await request.put('/api/user/profile', profile);
      return data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return null;
    }
  },

  // 登出
  logout: async (): Promise<boolean> => {
    try {
      await request.post('/api/auth/logout');
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }
};