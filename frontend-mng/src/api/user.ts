import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取用户列表
 */
export function listUsers(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/sys/user/page',
    method: 'get',
    params,
  });
}

/**
 * 获取用户详情
 */
export function getUser(id: number | string): Promise<Result<any>> {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
  });
}

/**
 * 新增用户
 */
export function addUser(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/user',
    method: 'post',
    data,
  });
}

/**
 * 修改用户
 */
export function updateUser(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/user',
    method: 'put',
    data,
  });
}

/**
 * 删除用户
 */
export function deleteUser(id: number | string): Promise<Result<null>> {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  });
}

/**
 * 批量删除用户
 */
export function batchDeleteUsers(ids: number[]): Promise<Result<null>> {
  return request({
    url: '/sys/user/batchDelete',
    method: 'post',
    data: ids,
  });
}
