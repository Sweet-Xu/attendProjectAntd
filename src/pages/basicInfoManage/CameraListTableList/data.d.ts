export interface TableListItem {
  cameraId: number;
  cameraCode:string;
  classroomId:string;
  cameraIp: string;
  cameraPort:number;
  cameraPwd:string;
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
  cameraId?: number;
  cameraCode?:string;
  classroomId?:string;
  cameraIp?:string;
  cameraPort?:number;
  cameraPwd?:string;
}
