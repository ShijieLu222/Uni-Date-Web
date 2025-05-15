import axios from 'axios';

// 设置默认API地址，避免环境变量缺失时报错
const API_BASE_URL = process.env.REACT_APP_API_URL;

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器（可加 token）
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器（统一处理错误）
request.interceptors.response.use(
  response => response,  // 直接返回整个响应对象，不要从response.data中提取
  error => {
    console.error('API请求错误:', error);
    // 可以在这里处理特定错误状态
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('状态码:', error.response.status);
      console.error('响应数据:', error.response.data);
      
      // 处理401未授权错误
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // 可以添加重定向到登录页的逻辑
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default request;