import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryStudent(params?:TableListParams) {
  return request('/api/student', {
    method: 'GET',
    params,
    //  data:JSON.stringify(params),
  });
}

export async function removeStudent(params: { studentId: string}) {
  return request('/api/student', {
    method: 'DELETE',
    params,
  });
}

export async function addStudent(student: TableListParams) {
  console.log(student)
  return request('/api/student', {
    method: 'POST',
    data: {
      ...student,
      method: 'post',
    },
  });
}

export async function updateStudent(student: TableListParams) {
  // console.log(attendItem)
  // console.log(attendItem.ruleId)
  return request('/api/student', {
    method: 'Put',
    data: {
      ...student,
      method: 'update',
    },
  });
}
