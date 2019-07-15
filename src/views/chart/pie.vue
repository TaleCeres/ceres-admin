<template>
  <div class="pie-wrapper">
    <div class="container-fluid">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <x-panel>
            <x-pieWithTable></x-pieWithTable>
          </x-panel>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <x-panel>
            <x-gauge></x-gauge>
          </x-panel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import XPanel from '@/components/Panel/panel'
  import XPieWithTable from '@/components/base/Pie/pieWithTable'
  import XGauge from '@/components/base/Pie/gauge'
  export default {
    name: 'PieChart',
    components: {
      XPanel,
      XPieWithTable,
      XGauge,
    },
    data() {
      return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
