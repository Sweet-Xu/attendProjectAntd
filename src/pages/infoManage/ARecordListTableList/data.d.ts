export interface TableListItem {
  attendItemId:number;
  attendId:number;
  studentId:number;
  attendTime:Date;
  attendResult:string;
  attendName:string;
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
  attendItemId?:number;
  attendId?:number;
  studentId?:number;
  attendTime?:Date;
  attendResult?:string;
}
