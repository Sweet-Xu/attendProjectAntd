import React from 'react';
import {DatePicker, Form, Input, Modal, TimePicker} from 'antd';
import moment from "moment";

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新增考勤规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
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
        {/*  <TimePicker format={'HH:mm:ss'} />*/}
        {/*  /!*<TimePicker  format={moment().format(' HH:mm:ss')}/>*!/*/}
        {/*</FormItem>*/}
        <FormItem
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          label="课程结束时间"
          name="courseEndTime"
          rules={[{ required: true, message: '请输入如下格式:09:40:00', min: 8 }]}
        >
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
