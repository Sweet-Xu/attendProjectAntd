import React, { useState } from 'react';
import {Form, Button, TimePicker, Input, Modal, Radio, Select, Steps, DatePicker} from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  attendItemId?:number;
  attendId?:number;
  attendName?:string;
  studentId?:number;
  studentName?:string;
  attendTime?:Date;
  attendResult?:string;
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
    attendItemId:props.values.attendItemId,
    attendId: props.values.attendId,
    attendName:props.values.attendName,
    studentId:props.values.studentId,
    studentName:props.values.studentName,
    attendTime:props.values.attendTime,
    attendResult:props.values.attendResult,
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
      bodyStyle={{ padding: '20px 50px 48px 30px' }}
      destroyOnClose
      title="更新考勤记录"
      visible={updateModalVisible}
      // footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      //afterClose={() => handleUpdateModalVisible()}
      onOk={okHandle}
    >
      {/*<Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>*/}
      {/*  <Step title="基本信息" />*/}
      {/*  <Step title="配置规则属性" />*/}
      {/*  <Step title="设定调度周期" />*/}
      {/*</Steps>*/}
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          attendItemId:formVals.attendItemId,
          attendId: formVals.attendId,
          attendName:formVals.attendName,
          studentId:formVals.studentId,
          studentName:formVals.studentName,
          attendTime:formVals.attendTime,
          attendResult:formVals.attendResult,
        }}
      >
        <FormItem name="attendItemId">
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="所在考勤表编号"
          name="attendId"
          //rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="考勤表名称"
          name="attendName"
          //rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="学生学号"
          name="studentId"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="学生姓名"
          name="studentName"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="打卡时间"
          name="attendTime"
         // rules={[{ required: true, message: '请输入如下格式:09:40:00', min: 8 }]}
        >
          {/*<TimePicker  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} value={moment}/>*/}
          {/*<Form.Item label="打卡时间" name="attendTime" noStyle><DatePicker/></Form.Item>*/}
          <input placeholder=""/>
          {/*<DatePicker*/}
          {/*  showTime*/}
          {/*  placeholder="请选择"*/}
          {/*  style={{ width: '100%' }}*/}
          {/*/>*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="考勤结果"
          name="attendResult"
         // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 8 }]}
        >
          <Input placeholder="07:30:00" />
        </FormItem>
        {/*{renderContent()}*/}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
