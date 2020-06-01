import store from '@/store'
const WIDTH = 992 // 参看 Bootstrap的响应式设置（https://v4.bootcss.com/docs/4.0/layout/overview/）

export default {
  data() {
    return {
      clientWidth: 0, // 页面宽度
    }
  },
  beforeMount() {
    window.onresize = () => this.handleResize()
  },
  methods: {
    setResize() {
      this.clientWidth = document.body.clientWidth
    },
    handleResize() {
      this.setResize()
      if (this.clientWidth <= WIDTH) {
        store.commit('app/CLOSE_SIDEBAR')
      } else {
        store.commit('app/OPEN_SIDEBAR')
      }
    },
  },
}
