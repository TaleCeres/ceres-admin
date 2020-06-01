
<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}所 ({d}%)'
  },
  color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
  series: [
    {
      name: '院校类型',
      type: 'pie',
      center: ['50%', '55%'],
      radius: ['40%', '70%'],
      avoidLabelOverlap: true, // avoidLabelOverlap:是否启用防止标签重叠策略，默认开启
      label: {
        fontSize: 16,
        formatter: '{b}院校 \n {c}所 ({d}%)',
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: [
        { name: '公办', value: 940 },
        { name: '民办', value: 179 },
        { name: '中外合作办学', value: 6 },
        { name: '内地与港澳台地区合作办学', value: 1 },
      ]
    }
  ]
}
export default {
  name: 'PieChart',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'pieChart'
    },
  },
  data() {
    return {
      chart: null,
      option,
    }
  },
  beforeMount() { },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
