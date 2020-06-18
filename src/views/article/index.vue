<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div class="header">
      <div class="title">文章列表</div>
      <el-select v-model="type" style="margin-left: 30px"  @change="handleArticleType">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <ceres-table
      :pagination="pagination"
      :table-column="tableColumn"
      :table-data="articleList"
      :operate="operate"
      :current-page="currentPage"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @currentChange = "currentChange"
    />
  </el-card>
</template>

<script type="text/ecmascript-6">
import Article from '@/models/article'
export default {
  name: 'ArticleList',
  data() {
    return {
      currentPage: 1,
      size: 10,
      type: 0,
      articleList: [],
      tableColumn: [
        { prop: 'title', label: '标题' },
        { prop: 'type', label: '类型' },
        {
          prop: 'img',
          label: '主图',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <el-image src={row.img} preview-src-list={[row.img]}></el-image>
            )
          }
        },
        { prop: 'author', label: '作者' },
        { prop: 'create_time', label: '上次编辑' },
        { prop: 'views', label: '阅读数' },
      ],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      pagination: {
        pageSize: this.$pagination.pageSize,
        pageTotal: 0
      },
      typeList: [
        {
          label: '全部类型',
          value: 0,
        },
        {
          label: '公司资讯',
          value: 1,
        },
        {
          label: '行业资讯',
          value: 2,
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await Article.getArticleList(this.currentPage, this.size, this.type)
      this.articleList = [...res.items]
      this.pagination.pageTotal = res.total
    },
    handleArticleType(val) {
      this.type = val
      this.getList()
    },

    handleEdit(data) {
      const { row } = data
      this.$router.push({
        path: `/article/edit/${row.id}`
      })
    },
    async handleDelete(data) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { row } = data
        await Article.deleteArticle(row.id)
        this.$message.success('删除文章成功')
        this.getList()
      })
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    .header {
      display flex
      align-items center
      .title {
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
    }
  }
</style>
