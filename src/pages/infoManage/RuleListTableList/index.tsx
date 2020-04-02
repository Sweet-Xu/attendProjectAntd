import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryAttendRule, updateAttendRule, addAttendRule, removeAttendRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addAttendRule({
      ruleName: fields.ruleName,
      courseStartTime:fields.courseStartTime,
      courseEndTime:fields.courseEndTime,
      checkStartTime:fields.checkStartTime,
      checkEndTime:fields.checkEndTime,
      normalLateMin:fields.normalLateMin,
      normalLeaveEarlyMin:fields.normalLeaveEarlyMin,
      normalInOutNum:fields.normalInOutNum,
      normalStayOutTime:fields.normalStayOutTime,
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
  const hide = message.loading('正在配置');
  try {
    await updateAttendRule({
      ruleId:fields.ruleId,
      ruleName: fields.ruleName,
      courseStartTime:fields.courseStartTime,
      courseEndTime:fields.courseEndTime,
      checkStartTime:fields.checkStartTime,
      checkEndTime:fields.checkEndTime,
      normalLateMin:fields.normalLateMin,
      normalLeaveEarlyMin:fields.normalLeaveEarlyMin,
      normalInOutNum:fields.normalInOutNum,
      normalStayOutTime:fields.normalStayOutTime,
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
    let ruleIds = selectedRows.map(row => row.ruleId);
    for (let i=0;i<ruleIds.length;i++) {
    await removeAttendRule(
    {ruleId: ruleIds[i]});
    };
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
      title: '规则编号',
      dataIndex: 'ruleId',
    },
    {
      title: '规则名称',
      dataIndex: 'ruleName',
    },
    {
      title: '课程开始时间',
      dataIndex: 'courseStartTime',
      valueType: "time",
      render: (_, record) => {return record.courseStartTime}
    },
    {
      title: '课程结束时间',
      dataIndex: 'courseEndTime',
      valueType: "time",
      render: (_, record) => {return record.courseEndTime}
    },
    {
      title: '可开始打卡时间',
      dataIndex: 'checkStartTime',
      valueType: "time",
      render: (_, record) => {return record.checkStartTime}
    },
    {
      title: '打卡已结束时间',
      dataIndex: 'checkEndTime',
      valueType: "time",
      render: (_, record) => {return record.checkEndTime}
    },
    {
      title: '正常最晚迟到时间',
      dataIndex: 'normalLateMin',
    },
    {
      title: '正常最早离开时间',
      dataIndex: 'normalLeaveEarlyMin',
    },
    {
      title: '正常进出次数',
      dataIndex: 'normalInOutNum',
    },
    {
      title: '正常待在教室外时间',
      dataIndex: 'normalStayOutTime',
    },
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
          {/*<a href="">订阅警报</a>*/}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="ruleId"
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
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}

        request={params => queryAttendRule(params)}
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
