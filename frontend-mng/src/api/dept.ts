import request from '@/utils/request';
import type { Result, PageResult } from '@/utils/request';

/**
 * 分页获取部门列表
 */
export function listDepts(params: any): Promise<Result<PageResult<any>>> {
  return request({
    url: '/sys/dept/page',
    method: 'get',
    params,
  });
}

/**
 * 获取部门详情
 */
export function getDept(id: number | string): Promise<Result<any>> {
  return request({
    url: `/sys/dept/${id}`,
    method: 'get',
  });
}

/**
 * 获取部门列表（不分页）
 */
export function getDeptList(params?: any): Promise<Result<any[]>> {
  return request({
    url: '/sys/dept/list',
    method: 'get',
    params,
  });
}

/**
 * 新增部门
 */
export function addDept(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/dept',
    method: 'post',
    data,
  });
}

/**
 * 修改部门
 */
export function updateDept(data: any): Promise<Result<null>> {
  return request({
    url: '/sys/dept',
    method: 'put',
    data,
  });
}

/**
 * 删除部门
 */
export function deleteDept(id: number | string): Promise<Result<null>> {
  return request({
    url: `/sys/dept/${id}`,
    method: 'delete',
  });
}
