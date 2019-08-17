export default {
  data() {
    return {
      browserWidth: 1900,
      browserHeight: 900
    }
  },
  created() {
    this.resizeCharts()
  },
  methods: {
    resizeCharts() {
      this.browserWidth = document.documentElement.clientWidth
      this.browserHeight = document.documentElement.clientHeight
      if (this.browserHeight <= 650) {
        this.browserHeight = 650
      }
    }
  }
}
