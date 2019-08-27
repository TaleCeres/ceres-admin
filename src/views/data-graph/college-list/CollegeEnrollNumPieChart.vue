
<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import { mapState } from 'vuex'
import { totalEnrollNum } from 'assets/data/stat'
export default {
  name: 'CollegeEnrollNumPieChart',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'collegeEnrollNumPieChart'
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
          formatter: '{a} <br/>{b}招收: {c}人 ({d}%)'
        },
        color: ['#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        series: [
          {
            name: '招生统计',
            type: 'pie',
            center: ['50%', '45%'],
            radius: ['40%', '70%'],
            avoidLabelOverlap: true, // avoidLabelOverlap:是否启用防止标签重叠策略，默认开启
            label: {
              fontSize: 16,
              formatter: '{b}招收 \n {c}人 \n ({d}%)',
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
            },
            data: this.provinceStat
          }
        ]
      }
    }
  },
  watch: {
    province(val) {
      let province = val
      this.provinceStat = totalEnrollNum[province]
      // 刷新map
      this.updateChart()
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
