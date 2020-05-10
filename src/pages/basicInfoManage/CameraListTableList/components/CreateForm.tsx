import React from 'react';
import { Form, Input, Modal } from 'antd';

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
      title="添加设备"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="摄像机内码"
          name="cameraCode"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >

          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="所在教室"
          name="classroomId"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >

          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="ip地址"
          name="cameraIp"
          //rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >

          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="端口号"
          name="cameraPort"
          // rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >

          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
