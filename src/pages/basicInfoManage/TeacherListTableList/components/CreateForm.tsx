import React from 'react';
import { Form, Input, Modal } from 'antd';
import { Radio } from 'antd';

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
      title="增加教师"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="描述"
          name="desc"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="教师工号"
            name="teacherId"
            rules={[{ required: true, message: '请输入至少六个字符的规则描述！', min: 6 }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="教师名"
              name="teacherName"
              rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
            >
              <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="性别"
          name="gender"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          {/*<Radio.Group onChange={this.onChange} value={this.state.value}>*/}
          <Radio.Group >
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="部门"
          name="deptName"
          rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>

      </Form>
    </Modal>
  );
};

export default CreateForm;
