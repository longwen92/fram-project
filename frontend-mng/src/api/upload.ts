import request from '@/utils/request';
import type { Result } from '@/utils/request';

/**
 * 文件上传
 */
export function uploadFile(file: File): Promise<Result<string>> {
  const formData = new FormData();
  formData.append('file', file);

  return request({
    url: '/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
