export interface BasicGood {
  // id: string;
  // name?: string;
  // barcode?: string;
  // price?: string;
  // num?: string | number;
  // amount?: string | number;
  attendItemId:number;
  attendId:number;
  studentId:number;
  studentName:string;
  attendTime:Date;
  attendResult:string;
  attendName:string;
}



export interface BasicProgress {
  // key: string;
  // time: string;
  // rate: string;
  // status: string;
  // operator: string;
  // cost: string;
  attendItemId:number;
  attendId:number;
  studentId:number;
  studentName:string;
  attendTime:Date;
  attendResult:string;
  attendName:string;
}



export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
}

export interface AttendTitle {
  attendName:string;
  courseName:string;
  classId:number;
  classroomId:string;
  teacherName:string;
  ruleName:string;
}
