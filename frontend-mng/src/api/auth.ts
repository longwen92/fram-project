import request from '@/utils/request';
import type { Result } from '@/utils/request';

/**
 * 登录请求
 */
export function login(data: any): Promise<Result<{ token: string; user: any }>> {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
}

/**
 * 获取当前用户信息
 */
export function getInfo(): Promise<Result<any>> {
  return request({
    url: '/auth/info',
    method: 'get',
  });
}

/**
 * 退出登录
 */
export function logout(): Promise<Result<null>> {
  return request({
    url: '/auth/logout',
    method: 'post',
  });
}
