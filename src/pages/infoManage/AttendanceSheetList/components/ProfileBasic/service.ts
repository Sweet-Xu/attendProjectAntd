import request from '@/utils/request';

export async function queryBasicProfile(params: { attendId: number}) {
  //return request('/api/profile/basic');
  //return request('/api/attendDetail');
  return request('/api/attendDetail', {
    method: 'Get',
    params,
    // data: {
    //   ...restParams,
    //   method: 'delete',
    // },
  });
}
export async function queryAttendTitle(params: { attendId: number}) {
  return request('/api/attend/getAttend', {
    method: 'Get',
    params,
  });
}

export async function exportExcel(params: { attendId: number}) {
  return request('/api/attendItem/excel', {
    method: 'Get',
    params,
  });
}
export async function download(params: { fileName: string}) {
  return request('/api/common/download', {
    method: 'Get',
    params,
  });
}

