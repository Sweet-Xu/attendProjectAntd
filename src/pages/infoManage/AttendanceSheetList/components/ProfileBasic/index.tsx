import {Badge, Button, Card, Descriptions, Divider, Table} from 'antd';
import React, { Component } from 'react';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { connect, Dispatch } from 'umi';
import { connect, Dispatch } from 'dva';
import {AttendTitle, BasicProfileDataType} from './data.d';
import styles from './style.less';
import {PlusOutlined} from "@ant-design/icons/lib";
import {ProColumns} from "@ant-design/pro-table";
import {TableListItem} from "@/pages/infoManage/ARecordListTableList/data";
import moment from 'moment';
import {queryAttendTitle,exportExcel,download} from './service';


const progressColumns=[
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '打卡时间',
    dataIndex: 'attendTime',
    key: 'attendTime',
    // render:(value,Object)=> {
    //
    //   return DateAPI.format(value, 'yyyy-MM-dd hh:mm:ss');
    // }
    render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):''}</span>,

  },
  {
    title: '考勤结果',
    dataIndex: 'attendResult',
    key: 'attendResult',
    render: (text: string) => {
        if (text === '正常') {
          return <Badge status="success" text="正常" />;
        }
      if (text === '早退') {
        return <Badge status="warning" text="早退" />;
      }
      if (text === '旷课') {
        return <Badge status="error" text="旷课" />;
      }
        return <Badge status="default" text="暂无记录" />;
      },
  },
];

  const goodsColumns =[
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '打卡时间',
      dataIndex: 'attendTime',
      key: 'attendTime',
      render: val => <span>{val?moment(val).format('YYYY-MM-DD HH:mm:ss'):''}</span>,
    },
    {
      title: '考勤结果',
      dataIndex: 'attendResult',
      key: 'attendResult',
      render: (text: string) => {
        if (text === '正常') {
          return <Badge status="success" text="正常" />;
        }
        if (text === '迟到') {
          return <Badge status="warning" text="迟到" />;
        }
        if (text === '旷课') {
          return <Badge status="error" text="旷课" />;
        }
        return <Badge status="default" text="暂无记录" />;
      },
    },
  ];



interface ProfileBasicProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic: BasicProfileDataType;
  //attendTitle:AttendTitle;
}
interface ProfileBasicState {
  visible: boolean;
}

class ProfileBasic extends Component<
  ProfileBasicProps,
  ProfileBasicState
> {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic/fetchBasic',
      payload:{attendId:this.props.location.state.attendId},
    });
    queryAttendTitle({attendId:this.props.location.state.attendId}).then((res)=>{
      this.setState({
        attendTitle: res
      });
    })
  }

  componentWillMount(){
    // //console.log(this.props.location)//传递过来的所有参数
    // console.log(this.props.location.state.attendId)//val值
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic/fetchBasic',
    //   payload:{attendId:this.props.location.state.attendId},
    // });
  }

  render() {
    const { statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic, loading } = this.props;
    const { basicGoods, basicProgress } = statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            onClick={()=>{
              console.log("fasfasf")
              exportExcel({attendId:this.props.location.state.attendId}).then((res=>{
                if(res?.code==0) {
                  let fileName = res.msg
                  window.open("/api/common/download?fileName="+fileName)
                  // download({fileName:fileName})
                }
              }))
            }}
          >
            <PlusOutlined />
            导出
          </Button>
          <Descriptions title="考勤表" style={{ marginBottom: 32 }} >
            <Descriptions.Item label="名称">{this.state?.attendTitle.attendName}</Descriptions.Item>
            <Descriptions.Item label="课程">{this.state?.attendTitle.courseName}</Descriptions.Item>
            <Descriptions.Item label="班级">{this.state?.attendTitle.classId}</Descriptions.Item>
            <Descriptions.Item label="教室">{this.state?.attendTitle.classroomId}</Descriptions.Item>
            <Descriptions.Item label="教师">{this.state?.attendTitle.teacherName}</Descriptions.Item>
            <Descriptions.Item label="规则">{this.state?.attendTitle.ruleName}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />

          <div className={styles.title}>签到情况</div>
          {/*<Table*/}
          {/*  style={{ marginBottom: 24 }}*/}
          {/*  pagination={false}*/}
          {/*  loading={loading}*/}
          {/*  dataSource={goodsData}*/}
          {/*  columns={goodsColumns}*/}
          {/*  rowKey="id"*/}
          {/*/>*/}
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={basicGoods}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>签退情况</div>
          <div>

          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic,
    loading,
  }: {
    statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic: BasicProfileDataType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic,
    loading: loading.effects['statisticalAnalysisAndDashboardWorkplaceAndcomponentsAndProfileBasic/fetchBasic'],

  }),
)(ProfileBasic);
