import moment from "moment";

export interface TableListItem {
  ruleId:number;
  ruleName:string;
  courseStartTime:time;
  courseEndTime:time;
  checkStartTime:time;
  checkEndTime:time
  normalLateMin:string;
  normalLeaveEarlyMin:string;
  normalInOutNum:string;
  normalStayOutTime:string;
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
  // sorter?: string;
  // status?: string;
  // name?: string;
  // desc?: string;
  // key?: number;
  ruleId?: number;
  ruleName?: string;
  courseStartTime?: time;
  courseEndTime?: time;
  checkStartTime?: time;
  checkEndTime?: time;
  normalLateMin?: string;
  normalLeaveEarlyMin?: string;
  normalInOutNum?: string;
  normalStayOutTime?: string;
  pageSize?: number;
  currentPage?: number;
}
