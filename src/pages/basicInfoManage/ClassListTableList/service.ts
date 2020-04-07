import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryClasses(params?:TableListParams) {
  return request('/api/classes', {
    method: 'GET',
    params,
  });
}

export async function removeClasses(params: { classId: number}) {
  return request('/api/classes', {
    method: 'DELETE',
    params,
  });
}

export async function addClasses(classes: TableListParams) {
  console.log(classes)
  return request('/api/classes', {
    method: 'POST',
    data: {
      ...classes,
      method: 'post',
    },
  });
}

export async function updateClasses(classes: TableListParams) {
  return request('/api/classes', {
    method: 'Put',
    data: {
      ...classes,
      method: 'update',
    },
  });
}


