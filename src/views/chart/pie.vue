<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
export default {
  name: 'PieChart',
  components: {},
  mixins: [resize],
  data() {
    return {
      id: 'PieChart',
      highlightInterval: null
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.startLoading()
    setTimeout(() => {
      this.endLoading()
      this.drawChart()
      this.highlightChart()
    }, 2000)
  },
  methods: {
    highlightChart() {
      let { chart } = this
      let index = 0 // 播放所在下标
      this.highlightInterval = setInterval(() => {
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index === 0 ? 2 : index - 1
        })
        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        index += 1
        if (index > 6) index = 0
      }, 2000)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
