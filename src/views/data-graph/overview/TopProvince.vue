<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
const option = {
  series: [{
    type: 'treemap',
    label: {
      fontSize: 14,
      formatter: '{b} \n {c}'
    },
    roam: false, // 缩放
    data: [
      { name: '江苏', value: 77 },
      { name: '湖北', value: 68 },
      { name: '北京', value: 67 },
      { name: '山东', value: 67 },
      { name: '广东', value: 64 },
      { name: '辽宁', value: 64 },
      { name: '河北', value: 61 },
      { name: '浙江', value: 59 },
      { name: '河南', value: 55 },
      { name: '陕西', value: 55 },
      { name: '四川', value: 51 },
      { name: '湖南', value: 51 }
    ]
  }]
}

export default {
  name: 'TopProvince',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'topProvince'
    }
  },
  data() {
    return {
      chart: null,
      option,
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
