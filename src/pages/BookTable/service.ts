import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryBook() {
  return request('/api/book', {
    method: 'GET',
  });
}
export async function removeBook(params: { bookId: number,bookName:string }) {
  return request('/api/book', {
    method: 'DELETE',
    params,
  });
}

export async function addBook(book: TableListParams) {
  console.log(book)
  return request('/api/book2', {
    method: 'POST',
    data: {
      ...book,
      method: 'post',
    },
  });
}


export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
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

export async function addRule(params: TableListParams) {
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
