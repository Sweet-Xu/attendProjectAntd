import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryCamera(params?:TableListParams) {
  return request('/api/camera', {
    method: 'GET',
    params,
  });
}

export async function removeCamera(params: { cameraId: number}) {
  return request('/api/camera', {
    method: 'DELETE',
    params,
  });
}

export async function addCamera(camera: TableListParams) {
  console.log(camera)
  return request('/api/camera', {
    method: 'POST',
    data: {
      ...camera,
      method: 'post',
    },
  });
}

export async function updateCamera(camera: TableListParams) {
  return request('/api/camera', {
    method: 'Put',
    data: {
      ...camera,
      method: 'update',
    },
  });
}
