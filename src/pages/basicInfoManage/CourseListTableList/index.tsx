import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryCourse, updateCourse, addCourse, removeCourse } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addCourse({
      courseId:fields.courseId,
      classId: fields.classId,
      classroomId:fields.classroomId,
      courseName:fields.courseName,
      teacherId:fields.teacherId,
      courseDate:fields.courseDate,
      courseStartTime: fields.courseStartTime,
      courseEndTime: fields.courseEndTime,
      courseStartWeek:fields.courseStartWeek,
      courseEndWeek:fields.courseEndWeek,
      schoolYear:fields.schoolYear,
      semester:fields.semester,
      grade: fields.grade,
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
    await updateCourse({
      courseId:fields.courseId,
      classId: fields.classId,
      classroomId:fields.classroomId,
      courseName:fields.courseName,
      teacherId:fields.teacherId,
      courseDate:fields.courseDate,
      courseStartTime: fields.courseStartTime,
      courseEndTime: fields.courseEndTime,
      courseStartWeek:fields.courseStartWeek,
      courseEndWeek:fields.courseEndWeek,
      schoolYear:fields.schoolYear,
      semester:fields.semester,
      grade: fields.grade,
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
    let courseIds = selectedRows.map(row => row.courseId);
    for (let i=0;i<courseIds.length;i++) {
      await removeCourse({
        courseId: courseIds[i]
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
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '课程名',
      dataIndex: 'courseName',
    },
    {
      title: '上课班级',
      dataIndex: 'classId',
    },
    {
      title: '所在教室',
      dataIndex: 'classroomId',
    },
    {
      title: '任课老师',
      dataIndex: 'teacherId',
    },
    {
      title: '上课日期',
      dataIndex: 'courseDate',
      valueType: 'date',
    },
    {
      title: '上课时间',
      dataIndex: 'courseStartTime',
    },
    {
      title: '下课时间',
      dataIndex: 'courseEndTime',
    },
    {
      title: '开始周',
      dataIndex: 'courseStartWeek',
    },
    {
      title: '结束周',
      dataIndex: 'courseEndWeek',
    },
    {
      title: '学期',
      dataIndex: 'schoolYear',
    },
    {
      title: '学年',
      dataIndex: 'semester',
    },
    // {
    //   title: '调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   renderText: (val: string) => `${val} 万`,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   valueEnum: {
    //     0: { text: '关闭', status: 'Default' },
    //     1: { text: '运行中', status: 'Processing' },
    //     2: { text: '已上线', status: 'Success' },
    //     3: { text: '异常', status: 'Error' },
    //   },
    // },
    // {
    //   title: '上次调度时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true,
    //   valueType: 'dateTime',
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            更新
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="courseId"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
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
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={params => queryCourse(params)}
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
    </PageHeaderWrapper>
  );
};

export default TableList;
