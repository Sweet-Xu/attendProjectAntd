import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import MyCourseTable from './MyCourseTable';
import { queryCourseTable} from './service';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  let table =queryCourseTable().then((v)=>{return v});
  console.log(table);
  return (
    //content="这是一个新页面，从这里进行开发！"
    <PageHeaderWrapper  className={styles.main}>
      {/*<div style={{ paddingTop: 100, textAlign: 'center' }}>*/}
      {/*  <Spin spinning={loading} size="large" />*/}
      {/*</div>*/}
      <MyCourseTable courseTables={table}/>
    </PageHeaderWrapper>

  );
};
