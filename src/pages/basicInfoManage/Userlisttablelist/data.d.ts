export interface TableListItem {
  userId: number;
  username: string;
  password: string;
  userType: string;
  userCreateTime: string;
  lastLoginTime: string;
  userStatus: string;
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
  userId?: number;
  username?: string;
  password?: string;
  userType?: string;
  userCreateTime?: string;
  lastLoginTime?: string;
  userStatus?: string;
}
