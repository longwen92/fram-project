import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义接口响应格式 (对应后端 Result.java)
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
  timestamp: number;
}

// 定义分页结果格式 (对应后端 PageResult.java)
export interface PageResult<T = any> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  pages: number;
}

const service: AxiosInstance = axios.create({
  baseURL: '/api', // 使用 Vite 代理
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const { code, msg, data } = response.data;
    
    // 200 为后端定义的成功状态码
    if (code === 200) {
      return response.data as any;
    }
    
    // 401: Token 过期或无效
    if (code === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // 错误处理
    console.error(`[API Error]: ${msg}`);
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error) => {
    console.error(`[Network Error]: ${error.message}`);
    return Promise.reject(error);
  }
);

export default service;
