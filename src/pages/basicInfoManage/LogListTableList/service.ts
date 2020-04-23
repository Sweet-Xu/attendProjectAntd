import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryLog(params?:TableListParams) {
  return request('/api/log', {
    method: 'GET',
    params,
    //  data:JSON.stringify(params),
  });
}


export async function removeLog(params: { logId: string}) {
  return request('/api/log', {
    method: 'DELETE',
    params,
  });
}

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
