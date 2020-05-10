import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';
//查询班级统计
export async function queryClassAnalysis(params?: TableListParams) {
  return request('/api/getClassAnalysis', {
    params,
  });
}
// 查询课程统计
export async function queryCourseAnalysis(params?: TableListParams) {
  return request('/api/getCourseAnalysis', {
    params,
  });
}

// 查询学生签到统计，通过学生id
export async function queryStudentAnalysis(params?: TableListParams) {
  return request('/api/getStudentAnalysis', {
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

export async function addRule(params: TableListItem) {
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
