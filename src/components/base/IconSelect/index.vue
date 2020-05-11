<template>
  <div class="icon-body">
    <el-input v-model="name" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <i slot="suffix" class="el-icon-search el-input__icon" />
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <i :class="`fa ${item}`" />
      </div>
    </div>
  </div>
</template>

<script>
import icons from './icons'
export default {
  name: 'IconSelect',
  data() {
    return {
      name: '',
      iconList: icons
    }
  },
  methods: {
    filterIcons() {
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      } else {
        this.iconList = icons
      }
    },
    selectedIcon(name) {
      this.$emit('selected', name)
      document.body.click()
    },
    reset() {
      this.name = ''
      this.iconList = icons
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      padding 10px
      div {
        height: 40px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 20%;
        float: left;
        font-size 20px
      }
    }
  }
</style>
