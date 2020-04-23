import React, { useState } from 'react';
import {Form, Button, TimePicker, Input, Modal, Radio, Select, Steps, DatePicker} from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
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

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    courseId:props.values.courseId,
    classId: props.values.classId,
    classroomId:props.values.classroomId,
    courseName:props.values.courseName,
    teacherId:props.values.teacherId,
    courseDate:props.values.courseDate,
    courseStartTime:props.values.courseStartTime,
    courseEndTime:props.values.courseEndTime,
    courseStartWeek:props.values.courseStartWeek,
    courseEndWeek:props.values.courseEndWeek,
    schoolYear:props.values.schoolYear,
    semester:props.values.semester,
    grade:props.values.grade,

  });

//  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  // const forward = () => setCurrentStep(currentStep + 1);

  //const backward = () => setCurrentStep(currentStep - 1);

  // const handleNext = async () => {
  //   const fieldsValue = await form.validateFields();
  //
  //   setFormVals({ ...formVals, ...fieldsValue });
  //
  //   if (currentStep < 2) {
  //     forward();
  //   } else {
  //     handleUpdate(formVals);
  //   }
  // };

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate(fieldsValue);
  };

  return (
    <Modal
      width={500}
      bodyStyle={{ padding: '1px 50px 48px 30px' }}
      destroyOnClose
      title="更新学生信息"
      visible={updateModalVisible}
      // footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      //afterClose={() => handleUpdateModalVisible()}
      onOk={okHandle}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          courseId:formVals.courseId,
          classId: formVals.classId,
          classroomId:formVals.classroomId,
          courseName:formVals.courseName,
          teacherId:formVals.teacherId,
          courseDate:formVals.courseDate,
          courseStartTime:formVals.courseStartTime,
          courseEndTime:formVals.courseEndTime,
          courseStartWeek: formVals.courseStartWeek,
          courseEndWeek:formVals.courseEndWeek,
          schoolYear:formVals.schoolYear,
          semester:formVals.semester,
          grade:formVals.grade,
        }}
      >
        <FormItem name="courseId">
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程名称"
          name="courseName"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input disabled/>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="上课班级"
          name="classId"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="所在教室"
          name="classroomId"
          // rules={[{ required: true, message: '请输入数字！'}]} 要设置只能为整型数的规则
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="教师工号"
          name="teacherId"
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="上课日期"
          name="courseDate"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" type="date" pattern="yyyy-MM-dd" />
          {/*  <DatePicker />*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程开始时间"
          name="courseStartTime"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程开始周"
          name="courseStartWeek"
          //  rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="课程结束周"
          name="courseEndWeek"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学年"
          name="schoolYear"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学期"
          name="semester"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="年级"
          name="grade"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
