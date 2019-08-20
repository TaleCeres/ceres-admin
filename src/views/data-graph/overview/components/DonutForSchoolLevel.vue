
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
      center: ['50%', '45%'],
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        fontSize: 16,
        formatter: '{b}院校 \n {c} 所',
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
        { value: 1243, name: '本科' },
        { value: 1388, name: '专科' },
        { value: 988, name: '混合' },
      ]
    }
  ]
}
export default {
  name: 'DonutForSchoolLevel',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'donutForSchoolLevel'
    }
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
