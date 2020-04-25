import request from '@/utils/request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params: ParamsType) {
  // console.log(params);
  return request('/api/fake_list', {
    params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

//下面是用到的

export async function queryAttendList(params: ParamsType) {
  console.log(params)
  return request('/api/attend', {
    method: 'GET',
    params,
  });
}

export async function removeAttendList(params: { id: string}) {
 // const { count = 5, ...restParams } = params;
  return request('/api/attend', {
    method: 'Delete',
    params,
    // data: {
    //   ...restParams,
    //   method: 'delete',
    // },
  });
}
// export async function removeTeacher(params: { teacherId: string}) {
//   return request('/api/teacher', {
//     method: 'DELETE',
//     params,
//   });
// }

export async function addAttendList(attend: ParamsType) {
  const { count = 5, ...restParams } = attend;
  return request('/api/attend', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateAttendList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/attend', {
    method: 'Put',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
