<template>
  <el-container class="overview">
    <Screenfull style="position: fixed; top: 10px; right: 10px;" />
    <el-header class="header" height="72px">
      <p>全国高等院校分布</p>
    </el-header>
    <el-main>
      <el-row class="main" style="height: 100%">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" class="col-item">

          <GraphContainer title="各省高校数量热力图" class="graph-item xpanel-wrapper-2">
            <HeatMap id="HeatMap" />
          </GraphContainer>

          <GraphContainer title="" class="graph-item xpanel-wrapper-2">
            <DonutForCooperateType id="donutForCooperateType" />
          </GraphContainer>

        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" class="col-item">
          <GraphContainer title="全国高等院校城市分布" class="graph-item xpanel-wrapper-1">
            <ChinaMap id="chinaMap" />
          </GraphContainer>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" class="col-item">

          <GraphContainer title="全国院校本/专科比例" class="graph-item xpanel-wrapper-3">
            <DonutForSchoolLevel id="donutForSchoolLevel" />
          </GraphContainer>

          <GraphContainer title="本科院校TOP12的省份" class="graph-item xpanel-wrapper-3">
            <TopProvince id="topProvince" />
          </GraphContainer>

          <GraphContainer title="院校总数TOP10的城市" class="graph-item xpanel-wrapper-3">
            <TopCity id="topCity" />
          </GraphContainer>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
import Screenfull from 'comps/base/Screenfull'
import GraphContainer from 'comps/base/GraphContainer'
// 业务组件
import TopProvince from './TopProvince'
import ChinaMap from './ChinaMap'
import HeatMap from './HeatMap'
import DonutForSchoolLevel from './DonutForSchoolLevel'
import DonutForCooperateType from './DonutForCooperateType'
import TopCity from './TopCity' // 省份级组件

export default {
  name: 'Overview',
  components: {
    Screenfull,
    GraphContainer,
    TopProvince,
    ChinaMap,
    HeatMap,
    DonutForSchoolLevel,
    DonutForCooperateType,
    TopCity,
  },
  data() {
    return {
      chartHeight: 260,
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.overview {
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
