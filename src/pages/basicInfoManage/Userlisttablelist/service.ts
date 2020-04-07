import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryUser(params?:TableListParams) {
  return request('/api/user', {
    method: 'GET',
    params,
  });
}

export async function removeUser(params: { userId: number}) {
  return request('/api/user', {
    method: 'DELETE',
    params,
  });
}

export async function addUser(user: TableListParams) {
  console.log(user)
  return request('/api/user', {
    method: 'POST',
    data: {
      ...user,
      method: 'post',
    },
  });
}

export async function updateUser(user: TableListParams) {
  // console.log(attendItem)
  // console.log(attendItem.ruleId)
  return request('/api/user', {
    method: 'Put',
    data: {
      ...user,
      method: 'update',
    },
  });
}


