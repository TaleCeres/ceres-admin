<template>
  <div>
    <x-table :table-data="tableData" :labels="labels">
      <template v-slot="slotProps" >
      </template>
    </x-table>
  </div>
</template>

<script type="text/ecmascript-6">
import XTable from '@/components/base/Table'
export default {
  name: 'TableIndex',
  components: { XTable },
  data() {
    return {
      tableData: [{
        number: '0',
        index: '1',
        date: '2016-05-02',
        name: '王小虎',
        phone: '000000',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
      // labels: ['序号', '员工号', '用户名', '用户组', '部门', '岗位', '联系方式', '注册日期']
      labels: [{
        label: '序号',
        value: 'index',
        editType: 'input',
      }, {
        label: '员工号',
        value: 'number',
        editType: 'select',
      }, {
        label: '用户名',
        value: 'number',
        editType: 'slot',
      }, {
        label: '用户组',
        value: 'number',
      }, {
        label: '部门',
        value: 'number',
      }, {
        label: '岗位',
        value: 'number',
      }, {
        label: '联系方式',
        value: 'phone',
      }, {
        label: '注册日期',
        value: 'date',
        editType: 'link',
      }],
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
