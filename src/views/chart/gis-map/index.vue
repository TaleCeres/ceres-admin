<template>
  <div :id="id" style="width: 100%; height:85%; "></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import option from './option'
export default {
  name: 'GisMap',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'GisMap'
    }
  },
  data() {
    return {
      chart: null,
      series: [],
      option,
      intervalId: undefined
    }
  },
  mounted() {
    this.initBindClickInMap()
    this.carouselData()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    carouselData() {
      let { chart } = this
      let index = 2 // 播放所在下标
      this.intervalId = setInterval(() => {
        chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: index
        })
        index += 1
        if (index > 8) index = 2
      }, 2000)
    },
    initBindClickInMap() {
      this.chart.on('click', 'series', data => {
        const { alias, id, name } = data.data
        // 公司ID长度默认为24
        if (id.length === 24) {
          const routerConfig = {
            path: '/data-visual/company',
            query: {
              id
            }
          }
          // let newRouter = this.$router.resolve(routerConfig)
          // window.open(newRouter.href, '_blank')
          this.$router.push(routerConfig)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus"></style>
