import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryTeacher(params?:TableListParams) {
  return request('/api/teacher', {
    method: 'GET',
    params,
    //  data:JSON.stringify(params),
  });
}


export async function removeTeacher(params: { teacherId: string}) {
  return request('/api/teacher', {
    method: 'DELETE',
    params,
  });
}

export async function addTeacher(teacher: TableListParams) {
  console.log(teacher)
  return request('/api/teacher', {
    method: 'POST',
    data: {
      ...teacher,
      method: 'post',
    },
  });
}

export async function updateTeacher(teacher: TableListParams) {
  // console.log(attendItem)
  // console.log(attendItem.ruleId)
  return request('/api/teacher', {
    method: 'Put',
    data: {
      ...teacher,
      method: 'update',
    },
  });
}


