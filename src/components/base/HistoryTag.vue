<template>
  <div ref="scrollContainer" class="history-tag" @wheel.prevent="handleScroll">
    <div  class="router-box" :style="{width:(tags.length*130+'px')}"  >
      <router-link v-for="(item) in tags" :key="item.path" :to="item.path"
      :class="isActive(item)?'active':''" class="tag-item"
      @click.native="checkoutTag"
      >
        <span class="name">{{item.name}}</span>
        <span v-if="!item.affix" class="el-icon-close icon"
              @click.prevent.stop="closeSelectedTag(item)"
        />
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'HistoryTag',
  components: {},
  data() {
    return {
      tags: [ 
        // 初始化为{ affix: true }的路由
        // { name: '一览', path: '/dashboard/index', affix: true },
      ],
    }
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer
    }
  },
  watch: {
    $route(prev, next) {
      const { tags } = this
      this.addTag()
    },
  },
  created() {},
  mounted() { 
    this.addTag()
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft += eventDelta / 4
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isInTags(newTag) {
      let tagIndex = this.tags.findIndex(tag => tag.path === newTag.path)
      if (tagIndex < 0) return false
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = tagIndex * 100
      return true
    },
    addTag() {
      const { isInTags, tags, $route } = this
      const { name: nameInEn, meta: { title: nameInZh, affix }, path } = $route
      let newTag = {
        name: nameInZh,
        path,
        affix
      }
      if (!isInTags(newTag)) tags.push(newTag)
    },
    closeSelectedTag(curTag) {
      let { tags } = this
      let tagIndex = tags.findIndex(tag => tag.path === curTag.path)
      tags.splice(tagIndex, 1)
      if ((tagIndex === tags.length && this.isActive(curTag)) || this.isActive(curTag)) {
        let routerPath = this.tags[tagIndex - 1].path
        this.$router.push(routerPath)
      }
    },
    checkoutTag() {
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history-tag {
    width 100%
    height 32px
    line-height 28px
    overflow hidden
    box-shadow 0px 5px 5px -5px #eee
    .router-box {
      width auto
      .tag-item {
        margin 0 4px
        padding 0 8px
        border 1px solid #d8dce5
        height 26px
        line-height 26px
        display inline-block
        &:first-child {
          margin-left 10px
        }
        .name {
        }
        .icon {
          margin-left 8px
          width 16px
          height 16px
          line-height 16px
          text-align center
          border-radius 50%
          font-size 10px
          &:hover {
            background grey
            color white
          }
        }
        &.active {
          background-color #42b983
          color #fff
          border-color #42b983

          &::before {
            content ''
            background #fff
            display inline-block
            width 8px
            height 8px
            border-radius 50%
            position relative
            margin-right 2px
          }
        }
      }
    }

  }
  .history-tag::-webkit-scrollbar {/*滚动条整体样式*/
    width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .history-tag::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.1);
  }
  .history-tag:hover{
    overflow-x scroll
  }
  .history-tag::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: transparent 0 0 5px rgba(0,0,0,0.2);
    border-radius: 4px;
    background: #EDEDED;
  }

</style>
