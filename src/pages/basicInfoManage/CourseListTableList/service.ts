import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryCourse(params?:TableListParams) {
  return request('/api/course', {
    method: 'GET',
    params,
    //  data:JSON.stringify(params),
  });
}

export async function removeCourse(params: { courseId: string}) {
  return request('/api/course', {
    method: 'DELETE',
    params,
  });
}

export async function addCourse(course: TableListParams) {
  console.log(course)
  return request('/api/course', {
    method: 'POST',
    data: {
      ...course,
      method: 'post',
    },
  });
}

export async function updateCourse(course: TableListParams) {
  return request('/api/course', {
    method: 'Put',
    data: {
      ...course,
      method: 'update',
    },
  });
}
