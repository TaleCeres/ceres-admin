<template>
  <el-container class="college-list">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />
    <el-header class="header" height="72px">
      <p>谷逸科技数据大屏</p>
      <!-- <p>高等院校详情介绍</p> -->
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" class="col-item">

          <GraphContainer title="" class="graph-item xpanel-wrapper-1">
            <CollegeTable id="collegeTable" />
          </GraphContainer>

        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" class="col-item">
          <GraphContainer title="" class="graph-item xpanel-wrapper-1">
            <ProvinceMap id="provinceMap" />
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" class="col-item">

          <GraphContainer title="重点学科" class="graph-item xpanel-wrapper-3">
            <CollegeKeyMajorNumPieChart id="collegeKeyMajorNumPieChart" />
          </GraphContainer>

          <GraphContainer title="专业总数(本/专)" class="graph-item xpanel-wrapper-3">
            <CollegeTotalMajorNumPieChart id="collegeTotalMajorNumPieChart" />
          </GraphContainer>

          <GraphContainer title="招生人数(本/专)" class="graph-item xpanel-wrapper-3">
            <CollegeEnrollNumPieChart id="collegeEnrollNumPieChart" />
          </GraphContainer>

        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
// 省份级组件
import CollegeTable from '../_common/CollegeTable'
import ProvinceMap from './ProvinceMap'
import CollegeKeyMajorNumPieChart from './CollegeKeyMajorNumPieChart'
import CollegeTotalMajorNumPieChart from './CollegeTotalMajorNumPieChart'
import CollegeEnrollNumPieChart from './CollegeEnrollNumPieChart'


export default {
  name: 'CollegeListView',
  components: {
    Screenfull,
    GraphContainer,
    CollegeTable,
    ProvinceMap,
    CollegeKeyMajorNumPieChart,
    CollegeTotalMajorNumPieChart,
    CollegeEnrollNumPieChart,
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.college-list {
  height 100%
  background url('../_common/bg.png') center no-repeat
  background-size 100% 100%
  .header {
    margin-bottom 10px
    background url('../_common/header.png') center no-repeat
    line-height 65px
    text-align center
    color #5dc2fe
    font-size 28px
    font-weight 600
  }
  .main {
    .col-item {
      height 100%
      padding 0 5px
      .graph-item {
        padding-bottom 10px
        box-sizing border-box
      }
    }
  }
}
.xpanel-wrapper-1 {
  height 100%
}
.xpanel-wrapper-2 {
  height 50%
}
.xpanel-wrapper-3 {
  height 33.33333%
}
</style>
