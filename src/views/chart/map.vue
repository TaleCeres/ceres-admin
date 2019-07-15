<template>
  <div class="map-wrapper">
    <div class="container-fluid">
      <el-row :gutter="20" style="height: 100%;">
        <el-col :xs="24" :sm="24" :md="24" :lg="11">
          <x-panel>
            <x-chart-title-left title="HangZhou">
              <x-hz-map id="hzMap" slot="ChartOne"></x-hz-map>
            </x-chart-title-left>
          </x-panel>
          <x-panel>
            <x-chart-title-left title="China">
              <x-china-map id="chinaMap" slot="ChartOne"></x-china-map>
            </x-chart-title-left>
          </x-panel>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="11">
          <x-panel>
            <x-chart-title-right title="AnJi">
              <x-anji-map id="anjiMap" slot="ChartOne" @showDetails="handleDotDetails"></x-anji-map>
            </x-chart-title-right>
          </x-panel>
          <x-panel>
            <x-chart-title-right title="采集器地图">
              <x-black-china-map slot="ChartOne"></x-black-china-map>
            </x-chart-title-right>
          </x-panel>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="2">
          <x-panel>
            <span v-if="dotMessage">{{dotMessage.name}}</span>
            <span v-if="dotMessage">{{dotMessage.value}}</span>
          </x-panel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import XPanel from '@/components/Panel/panel'
  import XChartTitleLeft from '@/components/ChartTitleWrapper/chartTitleLeft'
  import XChartTitleRight from '@/components/ChartTitleWrapper/chartTitleRight'
  import XChinaMap from '@/components/base/Map/chinaMap/chinaMap'
  import XHzMap from '@/components/base/Map/hzMap/hzMap'
  import XAnjiMap from '@/components/base/Map/anjiMap/anjiMap'
  import XBlackChinaMap from '@/components/base/Map/blackChinaMap/blackChinaMap'

  export default {
    name: 'MapChart',
    components: {
      XPanel,
      XChartTitleLeft,
      XChartTitleRight,
      XChinaMap,
      XHzMap,
      XAnjiMap,
      XBlackChinaMap,
    },
    data() {
      return {
        dotMessage: ''
      }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      handleDotDetails(data) {
        this.dotMessage = data
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .map-wrapper
    overflow-x hidden
    overflow-y auto
</style>
