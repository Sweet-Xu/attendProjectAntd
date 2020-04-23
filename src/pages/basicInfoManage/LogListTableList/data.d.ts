export interface TableListItem {
  id:string;
  username: string;
  operation:string;
  time:number;
  method:string;
  params:string;
  ip: string;
  createTime:Date;
  location:string;
  timeField:string;
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
  id?:number;
  username?:string;
  operation?:string;
  time?:number;
  method?:string;
  params?:string;
  ip?:string;
  createTime?:Date;
  location?:string;
  timeField?:string;
}
