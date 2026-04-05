// API 基础配置和实例
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { APP_CONFIG } from '@/constants';

// 创建axios实例
const api: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    // 处理401未授权
    if (response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    // 统一错误处理
    const errorMessage = response?.data?.message || '请求失败，请稍后重试';
    console.error('API Error:', errorMessage);

    return Promise.reject(error);
  }
);

export default api;