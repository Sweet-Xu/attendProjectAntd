export interface TableListItem {
  classId: number;
  collegeName:string;
  teacherId:string;
  classPeopleNum: number;
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
  classId?: number;
  collegeName?: string;
  teacherId?: string;
  classPeopleNum?: number;
}
