import React, { useState } from 'react';
import {Form, Button, TimePicker, Input, Modal, Radio, Select, Steps, DatePicker} from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  ruleId?: number;
  ruleName?: string;
  courseStartTime?: string;
  courseEndTime?: string;
  checkStartTime?: string;
  checkEndTime?: string;
  normalLateMin?: string;
  normalLeaveEarlyMin?: string;
  normalInOutNum?: string;
  normalStayOutTime?: string;
  pageSize?: number;
  currentPage?: number;
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
    ruleId:props.values.ruleId,
    ruleName: props.values.ruleName,
    courseStartTime:props.values.courseStartTime,
    courseEndTime:props.values.courseEndTime,
    checkStartTime:props.values.checkStartTime,
    checkEndTime:props.values.checkEndTime,
    normalLateMin:props.values.normalLateMin,
    normalLeaveEarlyMin:props.values.normalLeaveEarlyMin,
    normalInOutNum:props.values.normalInOutNum,
    normalStayOutTime:props.values.normalStayOutTime,

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

  // const renderContent = () => {
  //   if (currentStep === 1) {
  //     return (
  //       <>
  //         <FormItem name="target" label="监控对象">
  //           <Select style={{ width: '100%' }}>
  //             <Option value="0">表一</Option>
  //             <Option value="1">表二</Option>
  //           </Select>
  //         </FormItem>
  //         <FormItem name="template" label="规则模板">
  //           <Select style={{ width: '100%' }}>
  //             <Option value="0">规则模板一</Option>
  //             <Option value="1">规则模板二</Option>
  //           </Select>
  //         </FormItem>
  //         <FormItem name="type" label="规则类型">
  //           <RadioGroup>
  //             <Radio value="0">强</Radio>
  //             <Radio value="1">弱</Radio>
  //           </RadioGroup>
  //         </FormItem>
  //       </>
  //     );
  //   }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <FormItem
    //         name="time"
    //         label="开始时间"
    //         rules={[{ required: true, message: '请选择开始时间！' }]}
    //       >
    //         <DatePicker
    //           style={{ width: '100%' }}
    //           showTime
    //           format="YYYY-MM-DD HH:mm:ss"
    //           placeholder="选择开始时间"
    //         />
    //       </FormItem>
    //       <FormItem name="frequency" label="调度周期">
    //         <Select style={{ width: '100%' }}>
    //           <Option value="month">月</Option>
    //           <Option value="week">周</Option>
    //         </Select>
    //       </FormItem>
    //     </>
    //   );
    // }
    // return (
    //   <>
    //     <FormItem
    //       name="name"
    //       label="规则名称"
    //       rules={[{ required: true, message: '请输入规则名称！' }]}
    //     >
    //       <Input placeholder="请输入" />
    //     </FormItem>
    //     <FormItem
    //       name="desc"
    //       label="规则描述"
    //       rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
    //     >
    //       <TextArea rows={4} placeholder="请输入至少五个字符" />
    //     </FormItem>
    //   </>
    // );
  // };

  // const renderFooter = () => {
  //   if (currentStep === 1) {
  //     return (
  //       <>
  //         <Button style={{ float: 'left' }} onClick={backward}>
  //           上一步
  //         </Button>
  //         <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
  //         <Button type="primary" onClick={() => handleNext()}>
  //           下一步
  //         </Button>
  //       </>
  //     );
  //   }
  //   if (currentStep === 2) {
  //     return (
  //       <>
  //         <Button style={{ float: 'left' }} onClick={backward}>
  //           上一步
  //         </Button>
  //         <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
  //         <Button type="primary" onClick={() => handleNext()}>
  //           完成
  //         </Button>
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
  //       <Button type="primary" onClick={() => handleNext()}>
  //         下一步
  //       </Button>
  //     </>
  //   );
  // };

  return (
    <Modal
      width={600}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
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
          ruleId:formVals.ruleId,
          ruleName: formVals.ruleName,
          courseStartTime:formVals.courseStartTime,
          courseEndTime:formVals.courseEndTime,
          checkStartTime:formVals.checkStartTime,
          checkEndTime:formVals.checkEndTime,
          normalLateMin:formVals.normalLateMin,
          normalLeaveEarlyMin:formVals.normalLeaveEarlyMin,
          normalInOutNum:formVals.normalInOutNum,
          normalStayOutTime:formVals.normalStayOutTime,
        }}
      >
        <FormItem name="ruleId">
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="规则名称"
          name="ruleName"
          rules={[{ required: true, message: '请输入至少两个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="课程开始时间"
          name="courseStartTime"
          rules={[{ required: true, message: '请输入如下格式:08:00:00！', min: 8 }]}
        >
          <Input placeholder="08:00:00" />
        </FormItem>

        {/*<FormItem*/}
        {/*  labelCol={{ span: 8 }}*/}
        {/*  wrapperCol={{ span: 15 }}*/}
        {/*  name="courseStartTime"*/}
        {/*  label="课程开始时间"*/}
        {/*  rules={[{ required: true, message: '请选择开始时间！' }]}*/}
        {/*>*/}
        {/*  <DatePicker*/}
        {/*    style={{ width: '100%' }}*/}
        {/*    showTime*/}
        {/*    format="HH:mm:ss"*/}
        {/*    placeholder="选择开始时间"*/}
        {/*  />*/}
        {/*</FormItem>*/}

        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="课程结束时间"
          name="courseEndTime"
          rules={[{ required: true, message: '请输入如下格式:09:40:00', min: 8 }]}
        >
          {/*<TimePicker  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} value={moment}/>*/}
          <Input placeholder="09:40:00" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="可开始打卡时间"
          name="checkStartTime"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 8 }]}
        >
          <Input placeholder="07:30:00" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="打卡已结束时间"
          name="checkEndTime"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min:8  }]}
        >
          <Input placeholder="09:59:00" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="正常最晚迟到时间"
          name="normalLateMin"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="正常最早离开时间"
          name="normalLeaveEarlyMin"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="正常进出次数"
          name="normalInOutNum"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="正常待在教室外时间"
          name="normalStayOutTime"
          // rules={[{ required: true, message: '请输入至少个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
       {/*{renderContent()}*/}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
