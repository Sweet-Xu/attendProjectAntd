import request from '@/utils/request';
import { TableListParams } from './data.d';


export async function queryAttendRule(params?: TableListParams) {
  return request('/api/attendRule', {
    method: 'GET',
    params,
  });
}


export async function removeAttendRule(params: { ruleId: number}) {

  return request('/api/attendRule', {
    method: 'DELETE',
    params,
  });
}

export async function addAttendRule(attendRule: TableListParams) {
  //console.log(attendRule)
  return request('/api/attendRule', {
    method: 'POST',
    data: {
      ...attendRule,
      method: 'post',
    },
  });
}

export async function updateAttendRule(attendRule: TableListParams) {
  console.log(attendRule)
  console.log(attendRule.ruleId)
  return request('/api/attendRule', {
    method: 'Put',
    data: {
      ...attendRule,
      method: 'update',
    },
  });
}




