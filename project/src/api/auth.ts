import api from '.';
import type { User, ApiResponse } from '@/types';

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
}

// 注册参数
export interface RegisterParams {
  username: string;
  password: string;
  phone: string;
  userType: 'PERSONAL' | 'COMPANY';
  companyName?: string;
}

// 登录响应
export interface LoginResponse {
  token: string;
  user: User;
}

// 验证码响应
export interface CaptchaResponse {
  captchaId: string;
  captchaImage: string;
}

// 登录API
export const login = (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  return api.post('/auth/login', params);
};

// 注册API
export const register = (params: RegisterParams): Promise<ApiResponse<User>> => {
  return api.post('/auth/register', params);
};

// 退出登录
export const logout = (): Promise<ApiResponse<void>> => {
  return api.post('/auth/logout');
};

// 获取用户信息
export const getUserInfo = (): Promise<ApiResponse<User>> => {
  return api.get('/auth/user');
};

// 获取图形验证码
export const getCaptcha = (): Promise<ApiResponse<CaptchaResponse>> => {
  return api.get('/auth/captcha');
};

// 发送短信验证码
export const sendSmsCode = (phone: string): Promise<ApiResponse<void>> => {
  return api.post('/auth/sms', { phone });
};

// 验证短信验证码
export const verifySmsCode = (phone: string, code: string): Promise<ApiResponse<void>> => {
  return api.post('/auth/sms/verify', { phone, code });
};

// 重置密码
export const resetPassword = (phone: string, password: string, code: string): Promise<ApiResponse<void>> => {
  return api.post('/auth/password/reset', { phone, password, code });
};