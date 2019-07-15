<template>
  <div class="line-wrapper">
    <div class="container-fluid">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="8">
          <x-panel>
            <x-bar></x-bar>
          </x-panel>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8">
          <x-panel>
            <x-crosswise-bar></x-crosswise-bar>
          </x-panel>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8">
          <x-panel>
            <x-line></x-line>
          </x-panel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
import XPanel from '@/components/Panel/panel'
import XBar from '@/components/base/Line/bar'
import XCrosswiseBar from '@/components/base/Line/crosswiseBar'
import XLine from '@/components/base/Line/line'
export default {
  name: 'LineChart',
  components: {
    XPanel,
    XBar,
    XCrosswiseBar,
    XLine,
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
