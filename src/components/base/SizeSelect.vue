<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'SizeSelect',
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters['app/size']
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size
      this.$store.commit('app/SET_SIZE', size)
      this.refreshView()
      this.$message({
        message: '成功',
        type: 'success'
      })
    },
    refreshView() {
      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: `/redirect${fullPath}`
        })
      })
    }
  }

}
</script>
