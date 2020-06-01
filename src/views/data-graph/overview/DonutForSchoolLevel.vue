
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
  legend: {
    orient: 'vertical',
    x: 'left',
    textStyle: {
      color: '#fff'
    },
    data: ['本科人数', '专科人数', '本科专业', '专科专业']
  },
  color: ['#5bc49f', '#feb64d', '#ff7c7c', '#9287e7', '#60acfc', '#32d3eb'],
  series: [
    {
      name: '招生人数',
      type: 'pie',
      center: ['50%', '45%'],
      radius: ['50%', '75%'],
      avoidLabelOverlap: false,
      label: {
        fontSize: 16,
        formatter: '{b} \n {c} 位',
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
        { name: '本科人数', value: 116337 },
        { name: '专科人数', value: 77491 },
      ]
    },
    {
      name: '专业数量',
      type: 'pie',
      center: ['50%', '45%'],
      radius: ['0%', '40%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          position: 'inner',
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}个 ({d}%)'
      },
      data: [
        { name: '本科专业', value: 13614 },
        { name: '专科专业', value: 4360 },
      ]
    },
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
