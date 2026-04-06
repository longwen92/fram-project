import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取分类列表
 */
export function listCategories(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/cms/category/page',
    method: 'get',
    params,
  });
}

/**
 * 获取分类详情
 */
export function getCategory(id: number | string): Promise<Result<any>> {
  return request({
    url: `/cms/category/${id}`,
    method: 'get',
  });
}

/**
 * 获取分类列表（不分页）
 */
export function getCategoryList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/cms/category/list',
    method: 'get',
    params,
  });
}

/**
 * 新增分类
 */
export function addCategory(data: any): Promise<Result<null>> {
  return request({
    url: '/cms/category',
    method: 'post',
    data,
  });
}

/**
 * 修改分类
 */
export function updateCategory(data: any): Promise<Result<null>> {
  return request({
    url: '/cms/category',
    method: 'put',
    data,
  });
}

/**
 * 删除分类
 */
export function deleteCategory(id: number | string): Promise<Result<null>> {
  return request({
    url: `/cms/category/${id}`,
    method: 'delete',
  });
}

/**
 * 批量删除分类
 */
export function batchDeleteCategories(ids: number[]): Promise<Result<null>> {
  return request({
    url: '/cms/category/batchDelete',
    method: 'post',
    data: ids,
  });
}
