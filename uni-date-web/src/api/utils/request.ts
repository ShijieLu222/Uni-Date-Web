import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 环境变量
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
  response => response.data,
  error => {
    alert('请求出错：' + error.message);
    return Promise.reject(error);
  }
);

export default request;