import request from '@/utils/request';
import type { Result } from '@/utils/request';

/**
 * 获取菜单列表
 */
export function getMenuList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params,
  });
}

/**
 * 获取菜单详情
 */
export function getMenu(id: number | string): Promise<Result<any>> {
  return request({
    url: `/sys/menu/${id}`,
    method: 'get',
  });
}

/**
 * 新增菜单
 */
export function addMenu(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/menu',
    method: 'post',
    data,
  });
}

/**
 * 修改菜单
 */
export function updateMenu(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/menu',
    method: 'put',
    data,
  });
}

/**
 * 删除菜单
 */
export function deleteMenu(id: number | string): Promise<Result<null>> {
  return request({
    url: `/sys/menu/${id}`,
    method: 'delete',
  });
}
