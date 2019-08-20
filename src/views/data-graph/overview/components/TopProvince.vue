<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
const option = {
  series: [{
    type: 'treemap',
    label: {
      fontSize: 16,
      formatter: '{b} \n {c}'
    },
    roam: false, // 缩放
    data: [
      { name: '江苏省', value: 77 },
      { name: '湖北省', value: 68 },
      { name: '北京市', value: 67 },
      { name: '山东省', value: 67 },
      { name: '广东省', value: 64 },
      { name: '辽宁省', value: 64 },
      { name: '河北省', value: 61 },
      { name: '浙江省', value: 59 },
      { name: '河南省', value: 55 },
      { name: '陕西省', value: 55 },
      { name: '四川省', value: 51 },
      { name: '湖南省', value: 51 }
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
