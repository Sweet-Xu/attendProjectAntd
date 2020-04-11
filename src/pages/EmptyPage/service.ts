import request from '@/utils/request';

export async function queryCourseTable() {
  console.log("dfsad");
  return await request('/api/courseTable', {
    method: 'Get',
  });
}
