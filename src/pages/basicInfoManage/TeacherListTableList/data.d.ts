export interface TableListItem {
  teacherId:string;
  userId: number;
  deptName:string;
  teacherName:string;
  teacherGender:string;
  teacherEmail:string;
  teacherQQ: string;
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
  teacherId?:string;
  userId?: number;
  deptName?:string;
  teacherName?:string;
  teacherGender?:string;
  teacherEmail?:string;
  teacherQQ?:string;
}
