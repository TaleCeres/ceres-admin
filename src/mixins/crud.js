// 关于生命周期，先执行mixins，再执行混入mixins的组件
export default {
  data() {
    return {
      $query: {},
      searchToggle: true,
    }
  },
  mounted() {
    this.$query = this.query
  },
  methods: {
    toggleSearch() {
      this.searchToggle = !this.searchToggle
    },
    __resetQuery() {
      this.query = this.$query
    },
    handleColumnChange(item) {
      this.tableColumn.forEach(el => {
        if (el.prop === item.prop) {
          item.visible = !item.visible
        }
      })
    },
    handleCheckAllChange(val) {
      this.tableColumn.forEach(item => {
        item.visible = val
      })
    }
  }
}
