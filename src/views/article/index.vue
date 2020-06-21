<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div class="header">
      <el-select v-model="type" @change="handleArticleType">
        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
          @handleColumnChange="handleColumnChange"
          @handleCheckAllChange="handleCheckAllChange"
          @refresh="getList"/>
    </div>
    <CeresTable 
      v-loading="loading"
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
import crudMixin from '@/mixins/crud'

export default {
  name: 'ArticleList',
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
      currentPage: 1,
      size: 10,
      type: 0,
      articleList: [],
      tableColumn: [
        { prop: 'title', label: '标题', visible: true },
        { prop: 'type', label: '类型', visible: true },
        {
          prop: 'img',
          label: '主图',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <el-image src={row.img} preview-src-list={[row.img]}></el-image>
            )
          },
          visible: true
        },
        { prop: 'author', label: '作者', visible: true },
        { prop: 'create_time', label: '上次编辑', visible: true },
        { prop: 'views', label: '阅读数', visible: true },
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
      this.loading = true
      const res = await Article.getArticleList(this.currentPage, this.size, this.type)
      this.articleList = [...res.items]
      this.pagination.pageTotal = res.total
      this.loading = false
    },
    handleArticleType(val) {
      this.type = val
      this.getList()
    },

    handleEdit({ row }) {
      this.$router.push({
        path: `/article/edit/${row.id}`
      })
    },
    async handleDelete({ index, row }) {
      await Article.deleteArticle(row.id)
      this.$message.success('删除文章成功')
      this.getList()
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
      height 60px
      align-items center
      .crud-opts-right {
      }
    }
  }
</style>
