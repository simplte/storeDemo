<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div class="look"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from '../utils/axios'
export default defineComponent({
  name: "home",
  data() {
      return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
  },
  setup() {
      axios.post('/v1/cities',{type: 'guess'})
      .then((res) => { console.log('res: ', res) })
      .catch((err) => { console.log('err: ', err) }) }
  
});
</script>

<style lang="less">
@cloor:red;
.look{
    background: @cloor;
    width: 100px;
    height:100px
}
</style>
