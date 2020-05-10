import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import AnalysisBizCharts from "@/pages/statisticalAnalysis/analysisPage/components/AnalysisBizCharts";
import { Tabs } from 'antd';
import Final from "@/pages/statisticalAnalysis/analysisPage/components/Final";
import {queryClassAnalysis} from "@/pages/statisticalAnalysis/analysisPage/service";
import CourseFinal from "@/pages/statisticalAnalysis/analysisPage/components/CourseFinal";

const { TabPane } = Tabs;

export default () => {
  // const [classData, setClassData] = useState<any>();
  // if(classData==null){
  //   queryClassAnalysis().then(res=>{
  //     setClassData(res)
  //     console.log(res)
  //   })
  // }

  // const classData = [
  //   {
  //     country: "正常",
  //     year: "1750",
  //     value: 163
  //   },
  //   {
  //     country: "正常",
  //     year: "1800",
  //     value: 203
  //   },
  //   {
  //     country: "正常",
  //     year: "1850",
  //     value: 276
  //   },
  //   {
  //     country: "正常",
  //     year: "1900",
  //     value: 408
  //   },
  //   {
  //     country: "正常",
  //     year: "1950",
  //     value: 547
  //   },
  //   {
  //     country: "正常",
  //     year: "1999",
  //     value: 729
  //   },
  //   {
  //     country: "正常",
  //     year: "2050",
  //     value: 628
  //   },
  //   {
  //     country: "正常",
  //     year: "2100",
  //     value: 828
  //   },
  //
  //   {
  //     country: "迟到",
  //     year: "1750",
  //     value: 502
  //   },
  //   {
  //     country: "迟到",
  //     year: "1800",
  //     value: 635
  //   },
  //   {
  //     country: "迟到",
  //     year: "1850",
  //     value: 809
  //   },
  //   {
  //     country: "迟到",
  //     year: "1900",
  //     value: 947
  //   },
  //   {
  //     country: "迟到",
  //     year: "1950",
  //     value: 1402
  //   },
  //   {
  //     country: "迟到",
  //     year: "1999",
  //     value: 3634
  //   },
  //   {
  //     country: "迟到",
  //     year: "2050",
  //     value: 5268
  //   },
  //   {
  //     country: "迟到",
  //     year: "2100",
  //     value: 7268
  //   }
  //   ,
  //   {
  //     country: "早退",
  //     year: "1750",
  //     value: 502
  //   },
  //   {
  //     country: "早退",
  //     year: "1800",
  //     value: 635
  //   },
  //   {
  //     country: "早退",
  //     year: "1850",
  //     value: 809
  //   },
  //   {
  //     country: "早退",
  //     year: "1900",
  //     value: 947
  //   },
  //   {
  //     country: "早退",
  //     year: "1950",
  //     value: 1402
  //   },
  //   {
  //     country: "早退",
  //     year: "1999",
  //     value: 3634
  //   },
  //   {
  //     country: "早退",
  //     year: "2050",
  //     value: 5268
  //   },
  //   {
  //     country: "早退",
  //     year: "2100",
  //     value: 7268
  //   },
  //
  //   {
  //     country: "旷课",
  //     year: "1750",
  //     value: 502
  //   },
  //   {
  //     country: "旷课",
  //     year: "1800",
  //     value: 635
  //   },
  //   {
  //     country: "旷课",
  //     year: "1850",
  //     value: 809
  //   },
  //   {
  //     country: "旷课",
  //     year: "1900",
  //     value: 947
  //   },
  //   {
  //     country: "旷课",
  //     year: "1950",
  //     value: 1402
  //   },
  //   {
  //     country: "旷课",
  //     year: "1999",
  //     value: 3634
  //   },
  //   {
  //     country: "旷课",
  //     year: "2050",
  //     value: 5268
  //   },
  //   {
  //     country: "旷课",
  //     year: "2100",
  //     value: 7268
  //   },
  //
  // ];

  return (
    <PageHeaderWrapper  className={styles.main}>
      <Tabs defaultActiveKey="class" >
        <TabPane tab="班级" key="class" >
          <Final />
        </TabPane>
        <TabPane tab="课程" key="course">
          <CourseFinal />
        </TabPane>
        <TabPane tab="学生" key="student">
          <AnalysisBizCharts />
        </TabPane>
      </Tabs>

    </PageHeaderWrapper>
  );
};
