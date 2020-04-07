export interface TableListItem {
  studentId:string;
  classId: number;
  studentName:string;
  studentGender:string;
  studentEmail:string;
  studentQQ:string;
  userId: number;
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
  studentId?:string;
  classId?: number;
  studentName?:string;
  studentGender?:string;
  studentEmail?:string;
  studentQQ?:string;
  userId?:number;
}
