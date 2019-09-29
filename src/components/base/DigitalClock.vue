<template>
  <div class="clock">
    <div class="time">{{ time }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DigitalClock',
  components: {},
  data() {
    return {
      time: '',
      intervalId: undefined,
    }
  },
  computed: {},
  created() {
    this.getTime()
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    getTime() {
      let date = new Date()// 时间戳为10位需*1000
      let Y = `${date.getFullYear()}`
      let M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
      let D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      let h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`
      let m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
      let s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds())
      this.time = `${Y}-${M}-${D} ${h}:${m}:${s}`
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@font-face {
  font-family LcdD
  font-style normal
  src url('../../assets/fonts/LcdD.ttf')
}
.clock {
  position absolute
  margin-top -3px
  right 20px
  top 25px
  .time {
    font-family LcdD
    color #52a3e5
    letter-spacing 2px
    font-size 28px
  }
}
/* 移动端 clock */
@media only screen and (max-width: 992px) {
  .clock {
    display none
  }
}
</style>
