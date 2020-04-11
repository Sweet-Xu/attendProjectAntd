// import React from "react";
// import CourseTable from 'course-table';
//
// class MyCourseTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {courseTables: {}};
//
//   }
//   componentDidMount() {
//     console.log(this.props.courseTables)
//     this.props.courseTables.then((res)=>{console.log("回调暗示"+res); let t="{ 1: [ {  startTime:1551920827000,   endTime:1551924427000,  stuNameList: ['123'],  teaName: '312' } ] }";this.setState( {courseTables:t...==
//     // this.setState( {courseTables:this.props.courseTables});
//   }
//
//
//   render() {
//     return (
//       <CourseTable
//         courseTables={this.state.courseTables}
//       />
//     );
//   }
// }
//
// export default MyCourseTable;
