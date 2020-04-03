import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryAttendItem(params?:TableListParams) {
  return request('/api/attendItem', {
    method: 'GET',
   params,
   //  data:JSON.stringify(params),
  });
}


export async function removeAttendItem(params: { attendItemId: number}) {

  return request('/api/attendItem', {
    method: 'DELETE',
    params,
  });
}

export async function addAttendItem(attendItem: TableListParams) {
  console.log(attendItem)
  return request('/api/attendItem', {
    method: 'POST',
    data: {
      ...attendItem,
      method: 'post',
    },
  });
}

export async function updateAttendItem(attendItem: TableListParams) {
  // console.log(attendItem)
  // console.log(attendItem.ruleId)
  return request('/api/attendItem', {
    method: 'Put',
    data: {
      ...attendItem,
      method: 'update',
    },
  });
}

export async function queryRule(params?: TableListParams) {
  return request('/api/rule3', {
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
