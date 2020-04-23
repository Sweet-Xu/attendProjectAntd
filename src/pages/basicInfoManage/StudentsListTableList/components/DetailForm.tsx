import React, { useState } from 'react';
import {Form, Button, TimePicker, Input, Modal, Radio, Select, Steps, DatePicker} from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  studentId?:string;
  classId?: number;
  studentName?:string;
  studentGender?:string;
  studentEmail?:string;
  studentQQ?:string;
  userId?:number;
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

const DetailForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    studentId:props.values.studentId,
    classId: props.values.classId,
    studentName:props.values.studentName,
    studentGender:props.values.studentGender,
    studentEmail:props.values.studentEmail,
    studentQQ:props.values.studentQQ,
    userId:props.values.userId,
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
      width={400}
      bodyStyle={{ padding: '1px 50px 48px' }}
      destroyOnClose
      title="查看学生信息"
      visible={updateModalVisible}
      // footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      //fterClose={() => handleUpdateModalVisible()}
     // onOk={okHandle}
      onOk={() => handleUpdateModalVisible(false, values)}
    >
      <Form
        {...formLayout}
        form={form}
        // initialValues={{
        //   studentId:formVals.studentId,
        //   classId: formVals.classId,
        //   studentName:formVals.studentName,
        //   studentGender:formVals.studentGender,
        //   studentEmail:formVals.studentEmail,
        //   studentQQ:formVals.studentQQ,
        //   userId:formVals.userId,
        // }}
      >
        <FormItem name="userId">
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="学号"
          name="studentId"
          //rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          {formVals.studentId}
          {/*<Input disabled />*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="所在班级"
          name="classId"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          {/*<Input placeholder="请输入" />*/}
          {formVals.classId}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="学生姓名"
          name="studentName"
          // rules={[{ required: true, message: '请输入如下格式:09:40:00', min: 8 }]}
        >
          {/*<TimePicker  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} value={moment}/>*/}
          {/*<Input placeholder="请输入"disabled />*/}
          {formVals.studentName}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="性别"
          name="studentGender"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 8 }]}
        >
          {formVals.studentGender==1?"男":"女"}
          {/*<Radio.Group >*/}
          {/*  <Radio value={1}>男</Radio>*/}
          {/*  <Radio value={0} >女</Radio>*/}
          {/*</Radio.Group>*/}
          {/*<Input placeholder="07:30:00" />*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="电子邮箱"
          name="studentEmail"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          {/*<Input placeholder="请输入" disabled />*/}
          {formVals.studentEmail}
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="QQ号"
          name="studentQQ"
          //rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          {/*<Input placeholder="请输入" disabled/>*/}
          {formVals.studentQQ}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default DetailForm;
