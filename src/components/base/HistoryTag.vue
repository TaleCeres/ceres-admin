<template>
  <div class="history-tag">
    <div class="router-box">
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
        {
          name: '一览',
          path: '/dashboard/index',
          affix: true
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
  created() {
  },
  mounted() {
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isInTags(newTag) {
      let tagIndex = this.tags.findIndex(tag => tag.path === newTag.path)
      if (tagIndex < 0) return false
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
      if (tagIndex === tags.length && this.isActive(curTag)) {
        let routerPath = this.tags[tagIndex - 1].path
        this.$router.push(routerPath)
      }
    },
    checkoutTag() {
      console.log('click')
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .history-tag {
    width 100%
    height 28px
    line-height 28px
    overflow hidden
    white-space: nowrap
    overflow-x auto
    .tag-item {
      float left
      margin 0 4px
      padding 0 8px
      border 1px solid #d8dce5
      height 26px
      line-height 26px

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
  .history-tag::-webkit-scrollbar {/*滚动条整体样式*/

    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/

    height: 1px;

  }

  .history-tag::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

    border-radius: 10px;

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

    background: #535353;

  }

  .history-tag::-webkit-scrollbar-track {/*滚动条里面轨道*/

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

    border-radius: 10px;

    background: #EDEDED;

  }
</style>
