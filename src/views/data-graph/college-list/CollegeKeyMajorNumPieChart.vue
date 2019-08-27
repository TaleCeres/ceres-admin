
<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import { mapState } from 'vuex'
import { keyMajorStatNum } from 'assets/data/stat'
export default {
  name: 'CollegeKeyMajorNumPieChart',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'collegeKeyMajorNumPieChart'
    },
  },
  data() {
    return {
      chart: null,
      provinceStat: null,
    }
  },
  computed: {
    ...mapState({
      province: state => state.visual.geo.province
    }),
    option() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}个 ({d}%)'
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        series: [
          {
            name: '学科类型',
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['30%', '60%'],
            avoidLabelOverlap: true, // avoidLabelOverlap:是否启用防止标签重叠策略，默认开启
            label: {
              fontSize: 16,
              formatter: '{b}学科: {c}个 ({d}%)',
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 25,
            },
            data: this.provinceStat
          }
        ]
      }
    }
  },
  watch: {
    // 监听省份变化(失败)
    province(val) {
      // console.log('val', val)
      let province = val
      this.provinceStat = keyMajorStatNum[province]
      // 刷新 map
      this.updateChart()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
