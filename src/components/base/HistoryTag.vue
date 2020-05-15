<template>
  <div ref="scrollContainer" class="history-tag" @wheel.prevent="handleScroll">
    <div  class="router-box" :style="{width:(tags.length*130+'px')}"  >
      <router-link v-for="(item) in tags" :key="item.path" :to="item.path"
                   :class="isActive(item)?'active':''" class="tag-item"
                   @click.native="checkoutTag"
                   @contextmenu.prevent.native="openMenu(item,$event)"
      >
        <span class="name">{{item.name}}</span>
        <span v-if="!item.affix" class="el-icon-close icon"
              @click.prevent.stop="closeSelectedTag(item)"
        />
      </router-link>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'HistoryTag',
  components: {},
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      tags: [
        // 初始化为{ affix: true }的路由
        // { name: '一览', path: '/dashboard/index', affix: true },
      ],
      selectedTag: {},
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
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created() {},
  mounted() {
    if (localStorage.getItem('history')) {
      this.tags = JSON.parse(localStorage.getItem('history'))
    }
    this.addTag()
  },
  methods: {
    isAffix(tag) {
      return tag.affix
    },
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
      const {
        isRedirectTag, isInTags, tags, $route
      } = this
      const { name: nameInEn, meta: { title: nameInZh, affix }, path } = $route
      let newTag = {
        name: nameInZh,
        path,
        affix
      }
      if (!isInTags(newTag) && isRedirectTag(newTag)) tags.push(newTag)
      localStorage.setItem('history', JSON.stringify(tags))
    },

    isRedirectTag(tag) {
      if (tag.name) return true
      return false
    },

    closeSelectedTag(curTag) {
      let { tags } = this
      let tagIndex = tags.findIndex(tag => tag.path === curTag.path)
      tags.splice(tagIndex, 1)
      localStorage.setItem('history', JSON.stringify(tags))
      this.visible = false
      if ((tagIndex === tags.length && this.isActive(curTag)) || this.isActive(curTag)) {
        let routerPath = this.tags[tagIndex - 1].path
        this.$router.push(routerPath)
      }
    },
    checkoutTag() {
    },

    openMenu(tag, e) {
      const sidebarWidth = 170
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const { offsetWidth } = this.$el // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 + sidebarWidth// 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },

    refreshSelectedTag(view) {
      const { path } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: `/redirect${path}`
        })
      })
    },

    closeOthersTags() {
      const filterTags = this.tags.filter(item => item.affix || item === this.selectedTag)
      this.$nextTick(() => {
        localStorage.setItem('history', JSON.stringify(filterTags))
        this.$router.replace({
          path: `/redirect${this.selectedTag.path}`
        })
      })
    },

    closeAllTags() {
      const filterTags = this.tags.filter(item => item.affix)
      this.$nextTick(() => {
        localStorage.setItem('history', JSON.stringify(filterTags))
        this.$router.replace({
          path: `/redirect${filterTags[0].path}`
        })
      })
    },

    closeMenu() {
      this.visible = false
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history-tag {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .router-box {
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      width: 100%;
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
          background-color #409EFF
          color #fff
          border-color #409EFF

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

    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
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
