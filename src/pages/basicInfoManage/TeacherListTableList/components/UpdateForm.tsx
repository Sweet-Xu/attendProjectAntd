import React, { useState } from 'react';
import {Form, Button, TimePicker, Input, Modal, Radio, Select, Steps, DatePicker} from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  teacherId?:string;
  userId?: number;
  deptName?:string;
  teacherName?:string;
  teacherGender?:string;
  teacherEmail?:string;
  teacherQQ?:string;
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
    teacherId:props.values.teacherId,
    userId: props.values.userId,
    deptName:props.values.deptName,
    teacherName:props.values.teacherName,
    teacherGender:props.values.teacherGender,
    teacherEmail:props.values.teacherEmail,
    teacherQQ:props.values.teacherQQ,
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
      title="更新教师信息"
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
          teacherId:formVals.teacherId,
          userId: formVals.userId,
          deptName:formVals.deptName,
          teacherName:formVals.teacherName,
          teacherGender:formVals.teacherGender,
          teacherEmail:formVals.teacherEmail,
          teacherQQ:formVals.teacherQQ,
        }}
      >
        <FormItem name="userId">
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="教师工号"
          name="teacherId"
          //rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="所在部门"
          name="deptName"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="教师姓名"
          name="teacherName"
          // rules={[{ required: true, message: '请输入如下格式:09:40:00', min: 8 }]}
        >
          {/*<TimePicker  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} value={moment}/>*/}
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="性别"
          name="teacherGender"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 8 }]}
        >
          <Radio.Group >
            <Radio value={1} >男</Radio>
            <Radio value={0} >女</Radio>
          </Radio.Group>
          {/*<Input placeholder="07:30:00" />*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="电子邮箱"
          name="teacherEmail"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="QQ号"
          name="teacherQQ"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
