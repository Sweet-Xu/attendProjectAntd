import React from "react";
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
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {queryCourseAnalysis} from "@/pages/statisticalAnalysis/analysisPage/service";

class CourseFinal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  //组件将要挂载时候触发的生命周期函数
  componentWillMount(){
    queryCourseAnalysis().then(res=>{
      this.setState({data:res})
    })

  }

  render() {
   const data = this.state.data;
    const ds = new DataSet();
    const dv = ds
      .createView()
      .source(data)
      .transform({
        type: "percent",
        field: "value",
        // 统计销量
        dimension: "country",
        // 每年的占比
        groupBy: ["year"],
        // 以不同产品类别为分组
        as: "percent"
      });
    const cols = {
      percent: {
        min: 0,

        formatter(val) {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };
    return (
      <div>
        <Chart height={800} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="year" />
          <Axis name="percent" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="year*percent"
            color={"country"}
          />
        </Chart>
      </div>
    );
  }
}

export default CourseFinal;
