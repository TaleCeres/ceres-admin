<template>
  <div class="history-tag">
    <router-link v-for="(item) in tags" :key="item.path" :to="item.path">
      {{item.name}}
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'HistoryTag',
  components: {},
  data() {
    return {
      tags: [
        {
          name: 'admin',
          path: '/admin',
        },
        {
          name: 'about',
          path: '/about',
        },
      ],
    }
  },
  computed: {},
  watch: {
    $route(prev, next) {
      const { tags } = this
      this.addTag()
    },
  },
  created() { },
  mounted() { },
  methods: {
    addTag() {
      const { name } = this.$route
      console.log('name', name)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.tags-view {
  height 30px
  width 100%
  line-height 30px
}
</style>
