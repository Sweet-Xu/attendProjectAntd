import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, message, Upload} from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import DetailForm  from './components/DetailForm';
import { TableListItem } from './data.d';
import { queryStudent, updateStudent, addStudent, removeStudent } from './service';
import {queryCurrent} from'@/services/user';
import styles from "@/pages/AccountSettings/components/BaseView.less";
import {FormattedMessage} from "umi-plugin-react/locale";
import {UploadOutlined} from "@ant-design/icons/lib";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addStudent({
      studentId:fields.studentId,
      classId: fields.classId,
      studentName:fields.studentName,
      studentGender:fields.studentGender,
      studentEmail:fields.studentEmail,
      studentQQ:fields.studentQQ,
      userId: fields.userId,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateStudent({
      studentId:fields.studentId,
      classId: fields.classId,
      studentName:fields.studentName,
      studentGender:fields.studentGender,
      studentEmail:fields.studentEmail,
      studentQQ:fields.studentQQ,
      userId: fields.userId,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    let studentIds = selectedRows.map(row => row.studentId);
    for (let i=0;i<studentIds.length;i++) {
      await removeStudent({
        studentId: studentIds[i]
      });
    }
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [stepFormValues2, setStepFormValues2] = useState({});
  const [currentRole, setCurrentRole] = useState();
  const [detailVisible,setDetailVisible] = useState<boolean>(false);
  if(currentRole==null) {
    queryCurrent().then(res=>{
      console.log(res)
      setCurrentRole(res.role)
    })
  }
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
    },
    {
      title: '所在班级',
      dataIndex: 'classId',
    },
    {
      title: '学生姓名',
        dataIndex: 'studentName',
    },
      {
        title: '性别',
        dataIndex: 'studentGender',
        valueEnum:{
          0: { text: '女'},
          1: { text: '男' },
        }
      },
      {
        title: '电子邮箱',
        dataIndex: 'studentEmail',
      },
    {
      title: 'QQ号',
        dataIndex: 'studentQQ',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {currentRole=='admin' &&   <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            更新
          </a>}
          <a onClick={() => {
            setDetailVisible(true);
            setStepFormValues2(record);
          }}> 查看</a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  const importStudnetProps = {
    method:'post',
    type:"file",
    name: 'file',
    action: 'http://localhost:8284/api/student/importStudent',
    enctype:"multipart/form-data",
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <PageHeaderWrapper>
      {/*<form action="http://localhost:8284/api/student/importStudent" method="post" enctype="multipart/form-data"  target="nm_iframe">*/}
      {/*  <input type="file" name="file" /><input type="submit" value="提交" />*/}
      {/*</form>*/}
      {/*<iframe id="id_iframe" name="nm_iframe" style={{display:'none'}}></iframe>*/}
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="studentId"
        toolBarRender={(action, { selectedRows }) => [
          currentRole=='admin' &&(<Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>),
          currentRole=='admin' &&(
            <Upload showUploadList={false} {...importStudnetProps}>
              <Button>
                <UploadOutlined /> 导入
              </Button>
            </Upload>
          ),
          currentRole=='admin' && selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  {/*<Menu.Item key="approval">批量审批</Menu.Item>*/}
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        // tableAlertRender={(selectedRowKeys, selectedRows) => (
        //   <div>
        //     已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
        //     <span>
        //       服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
        //     </span>
        //   </div>
        // )}
        request={params => queryStudent(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
    <UpdateForm
      onSubmit={async value => {
        const success = await handleUpdate(value);
        if (success) {
          handleModalVisible(false);
          setStepFormValues({});
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
      onCancel={() => {
        handleUpdateModalVisible(false);
        setStepFormValues({});
      }}
      updateModalVisible={updateModalVisible}
      values={stepFormValues}
    />
  ) : null}
      {stepFormValues2 && Object.keys(stepFormValues2).length ? (
      <DetailForm
        onSubmit={async value => {
          const success = await handleUpdate(value);
          if (success) {
            setDetailVisible(false);
            setStepFormValues2({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setDetailVisible(false);
          setStepFormValues2({});
        }}
        updateModalVisible={detailVisible}
        values={stepFormValues2}
      />
      ) : null}
</PageHeaderWrapper>
  );
};

export default TableList;
