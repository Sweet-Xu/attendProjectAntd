export interface TableListItem {
  courseId: string;
  classId: number;
  classroomId: number;
  courseName: string;
  teacherId: string;
  courseDate: Date;
  courseStartTime: time;
  courseEndTime: time;
  courseStartWeek: string;
  courseEndWeek: string;
  schoolYear: string;
  semester: string;
  grade:string;
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
  courseId?: string;
  classId?: number;
  classroomId?: number;
  courseName?: string;
  teacherId?: string;
  courseDate?: Date;
  courseStartTime?: time;
  courseEndTime?: time;
  courseStartWeek?: string;
  courseEndWeek?: string;
  schoolYear?: string;
  semester?: string;
  grade?:string;
}
