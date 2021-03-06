import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
} from 'antd';

import { findDOMNode } from 'react-dom';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';
import {Link} from "umi";
import {publishResult} from "@/pages/infoManage/AttendanceSheetList/service";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface AttendanceSheetListProps {
  infoManageAndAttendanceSheetList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: {classId, courseName,ruleName,classroomId,owner, createdAt,attendStatus, percent, status },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span >考勤班级</span>
      <p>{classId}</p>
    </div>
    <div className={styles.listContentItem}>
      <span >考勤课程</span>
      <p>{courseName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>考勤规则</span>
      <p>{ruleName}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>考勤教室</span>
      <p>{classroomId}</p>
    </div>
    <div className={styles.listContentItem}>
      <span >负责人</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>开始时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span >状态</span>
      <p>{attendStatus}</p>
    </div>
    {/*<div className={styles.listContentItem}>*/}
    {/*  <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />*/}
    {/*</div>*/}
  </div>
);

export const AttendanceSheetList: FC<AttendanceSheetListProps> = props => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    infoManageAndAttendanceSheetList: { list },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'infoManageAndAttendanceSheetList/fetch',
      payload: {
        count: 5,
      },
    });
  }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: 20,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'infoManageAndAttendanceSheetList/submit',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      {/*<RadioGroup defaultValue="all">*/}
      {/*  <RadioButton value="all">全部</RadioButton>*/}
      {/*  <RadioButton value="progress">进行中</RadioButton>*/}
      {/*  <RadioButton value="waiting">等待中</RadioButton>*/}
      {/*</RadioGroup>*/}
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'infoManageAndAttendanceSheetList/submit',
      payload: { id, ...values },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          {/*<Card bordered={false}>*/}
          {/*  <Row>*/}
          {/*    <Col sm={8} xs={24}>*/}
          {/*      /!*<Info title="我的待办" value="8个任务" bordered />*!/*/}
          {/*      <Info title="未开始考勤表数" value="8个" bordered />*/}
          {/*    </Col>*/}
          {/*    <Col sm={8} xs={24}>*/}
          {/*      /!*<Info title="本周任务平均处理时间" value="32分钟" bordered />*!/*/}
          {/*      <Info title="正在进行中的考勤表数" value="6个" bordered />*/}
          {/*    </Col>*/}
          {/*    <Col sm={8} xs={24}>*/}
          {/*      /!*<Info title="本周完成任务数" value="24个任务" />*!/*/}
          {/*      <Info title="本周完成考勤表数" value="10个" />*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</Card>*/}
          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <a onClick={()=>{
                      console.log(item.id)
                      publishResult(item).then(res=>
                        alert("推送成功"))

                    }}>推送结果</a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    // title={<a href={item.href} >{item.title}</a>}
                    title={<Link to={
                      {
                        pathname:"/infomanage/profilebasic",
                        state:{attendId:item.id}
                      }}>{item.title}</Link>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    infoManageAndAttendanceSheetList,
    loading,
  }: {
    infoManageAndAttendanceSheetList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    infoManageAndAttendanceSheetList,
    loading: loading.models.infoManageAndAttendanceSheetList,
  }),
)(AttendanceSheetList);
