import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

//下面是用到的
export async function queryCurrentUser() {
  return request('/api/user/currentUser');
}

export async function queryProgressAttend() {
  return request('/api/attend/progressList');
}


// export async function queryAttendList(params: ParamsType) {
//   console.log(params)
//   return request('/api/attend', {
//     method: 'GET',
//     params,
//   });
// }
