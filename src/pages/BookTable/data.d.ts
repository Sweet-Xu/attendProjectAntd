export interface TableListItem {
  bookId:number;
  bookName:string;
  bookWriter:string;
  publishTime:Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  bookId?:number;
  bookName?:string;
  bookWriter?:string;
  publishTime?:Date;
  pageSize?: number;
  currentPage?: number;
}
