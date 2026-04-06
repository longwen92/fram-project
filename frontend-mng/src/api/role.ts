import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取角色列表
 */
export function listRoles(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params,
  });
}

/**
 * 获取角色详情
 */
export function getRole(id: number | string): Promise<Result<any>> {
  return request({
    url: `/sys/role/${id}`,
    method: 'get',
  });
}

/**
 * 获取角色列表（不分页）
 */
export function getRoleList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params,
  });
}

/**
 * 新增角色
 */
export function addRole(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/role',
    method: 'post',
    data,
  });
}

/**
 * 修改角色
 */
export function updateRole(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/role',
    method: 'put',
    data,
  });
}

/**
 * 删除角色
 */
export function deleteRole(id: number | string): Promise<Result<null>> {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete',
  });
}

/**
 * 批量删除角色
 */
export function batchDeleteRoles(ids: number[]): Promise<Result<null>> {
  return request({
    url: '/sys/role/batchDelete',
    method: 'post',
    data: ids,
  });
}
