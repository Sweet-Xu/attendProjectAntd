import React, { FC, useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import { BasicListItemDataType } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = props => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
    // e.preventDefault();
    //form.resetFields();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };
  // const modalFooter = done
  //   ? { footer: null, onCancel: onDone }
  //   : { okText: '保存', onOk: handleSubmit, onCancel };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="考勤表名称"
          rules={[{ required: true, message: '请输入考勤表名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="createdAt"
          label="开始时间"
          rules={[{ required: true, message: '请选择开始时间' }]}
        >
          <DatePicker
            showTime
            placeholder="请选择"
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          name="owner"
          label="负责人"
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <Select placeholder="请选择">
            <Select.Option value="段喜龙">段喜龙</Select.Option>
            <Select.Option value="徐甜">徐甜</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subDescription"
          label="所在教室"
          // rules={[{ message: '请输入至少五个字符的产品描述！', min: 5 }]}
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <Select placeholder="请选择">
          <Select.Option value="d301">d301</Select.Option>
          <Select.Option value="d305">d305</Select.Option>
          <Select.Option value="d306">d306</Select.Option>
        </Select>
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="subDescription"*/}
        {/*  label="考勤表描述"*/}
        {/*  rules={[{ message: '请输入至少五个字符的产品描述！', min: 5 }]}*/}
        {/*>*/}
        {/*  <TextArea rows={4} placeholder="请输入至少五个字符" />*/}
        {/*</Form.Item>*/}
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
