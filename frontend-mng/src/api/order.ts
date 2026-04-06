import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取订单列表
 */
export function listOrders(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/order/page',
    method: 'get',
    params,
  });
}

/**
 * 获取订单详情
 */
export function getOrder(id: number | string): Promise<Result<any>> {
  return request({
    url: `/order/${id}`,
    method: 'get',
  });
}

/**
 * 获取订单列表（不分页）
 */
export function getOrderList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/order/list',
    method: 'get',
    params,
  });
}

/**
 * 新增订单
 */
export function addOrder(data: any): Promise<Result<null>> {
  return request({
    url: '/order',
    method: 'post',
    data,
  });
}

/**
 * 修改订单
 */
export function updateOrder(data: any): Promise<Result<null>> {
  return request({
    url: '/order',
    method: 'put',
    data,
  });
}

/**
 * 删除订单
 */
export function deleteOrder(id: number | string): Promise<Result<null>> {
  return request({
    url: `/order/${id}`,
    method: 'delete',
  });
}
