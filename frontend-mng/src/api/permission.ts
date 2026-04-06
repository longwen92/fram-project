import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取权限列表
 */
export function listPermissions(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/sys/permission/page',
    method: 'get',
    params,
  });
}

/**
 * 获取权限详情
 */
export function getPermission(id: number | string): Promise<Result<any>> {
  return request({
    url: `/sys/permission/${id}`,
    method: 'get',
  });
}

/**
 * 获取权限列表（不分页）
 */
export function getPermissionList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/sys/permission/list',
    method: 'get',
    params,
  });
}

/**
 * 新增权限
 */
export function addPermission(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/permission',
    method: 'post',
    data,
  });
}

/**
 * 修改权限
 */
export function updatePermission(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/permission',
    method: 'put',
    data,
  });
}

/**
 * 删除权限
 */
export function deletePermission(id: number | string): Promise<Result<null>> {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete',
  });
}
