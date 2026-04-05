import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取商品列表
 */
export function listProducts(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/product/list',
    method: 'get',
    params,
  });
}

/**
 * 获取商品详情
 */
export function getProduct(id: number | string): Promise<Result<any>> {
  return request({
    url: `/product/${id}`,
    method: 'get',
  });
}

/**
 * 新增商品
 */
export function addProduct(data: any): Promise<Result<null>> {
  return request({
    url: '/product',
    method: 'post',
    data,
  });
}

/**
 * 修改商品
 */
export function updateProduct(data: any): Promise<Result<null>> {
  return request({
    url: '/product',
    method: 'put',
    data,
  });
}

/**
 * 删除商品
 */
export function delProduct(id: number | string): Promise<Result<null>> {
  return request({
    url: `/product/${id}`,
    method: 'delete',
  });
}
