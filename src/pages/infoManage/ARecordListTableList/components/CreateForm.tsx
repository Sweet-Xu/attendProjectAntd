import React from 'react';
import {DatePicker, Form, Input, Modal, Select} from 'antd';

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
      title="新建考勤记录"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="考勤表编号"
          name="attendId"
         // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="考勤表名称"
            name="attendName"
            // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
          >
            <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学生学号"
          name="studentId"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学生姓名"
          name="studentName"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="打卡时间"
          name="attendTime"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <DatePicker
            // style={{ width: '100%' }}
            showTime
            // showTime={{ format: 'HH:mm:ss' }}
            // format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择时间"
          />
          {/*<Input placeholder="请输入" />*/}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="考勤结果"
          name="attendResult"
         // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          {/*<Input placeholder="请输入" />*/}
          <Select placeholder="请选择">
            <Select.Option value="正常">正常</Select.Option>
            <Select.Option value="迟到">迟到</Select.Option>
            <Select.Option value="早退">早退</Select.Option>
            <Select.Option value="旷课">旷课</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
