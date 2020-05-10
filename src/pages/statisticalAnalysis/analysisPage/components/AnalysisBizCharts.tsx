import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { Select } from 'antd';
import {queryClassAnalysis, queryStudentAnalysis} from "@/pages/statisticalAnalysis/analysisPage/service";

const { Option } = Select;

class AnalysisBizCharts extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentStudent:"付豪",
      data:[{
        "item": "正常",
        "count": "0"
      }, {
        "item": "迟到",
        "count": "0"
      }, {
        "item": "早退",
        "count": "0"
      }, {
        "item": "旷课",
        "count": "100"
      }]
    }
    this.handleChange = this.handleChange.bind(this);//手动绑定
  }

  //组件将要挂载时候触发的生命周期函数
  componentWillMount(){
    queryStudentAnalysis({id:this.state.currentStudent}).then(res=>{
      this.setState({...this.state,data:res})
    })

  }
   handleChange(value) {
     queryStudentAnalysis({id:value.value}).then(res=>{
       this.setState({currentStudent:value.value,data:res})
     })
  }
  render() {
    const { DataView } = DataSet;
    const data = this.state.data;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    function getXY(c, { index: idx = 0, field = 'percent', radius = 0.5 }) {
      const d = c.get('data');
      if (idx > d.length) return;
      const scales = c.get('scales');
      let sum = 0;
      for (let i = 0; i < idx + 1; i++) {
        let val = d[i][field];
        if (i === idx) {
          val = val / 2;
        }
        sum += val;
      }
      const pt = {
        y: scales[field].scale(sum),
        x: radius,
      };
      const coord = c.get('coord');
      let xy = coord.convert(pt);
      return xy;
    }

    return (
      <div >
        <Select
          labelInValue
          defaultValue={this.state.currentStudent}
          style={{ width: 120 }}
          onChange={this.handleChange}
        >
          <Option value="16201303">16201303</Option>
          <Option value="16201301">16201301</Option>
          <Option value="16201302">16201302</Option>
          <Option value="16201307">16201307</Option>
        </Select>
        <Chart
        bu  height={800}
          width={100}
          data={dv}
          scale={cols}
          padding={[80, 100, 80, 80]}
          forceFit
          onGetG2Instance={c => {
            const xy = getXY(c, { index: 0 });
            c.showTooltip(xy);
          }}
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-window.innerHeight / 2 + 200}
          />
          <Tooltip
            //triggerOn='none'
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ': ' + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default AnalysisBizCharts;
