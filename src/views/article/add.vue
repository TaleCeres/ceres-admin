<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <ArticleForm title="新增文章" @submit-article="handleSubmitArticle" />
  </el-card>
</template>

<script>
import Article from '@/models/article'
import Tinymce from '@/components/base/Tinymce'
import ArticleForm from './ArticleForm'
export default {
  name: 'add',
  components: {
    Tinymce,
    ArticleForm
  },
  data() {
    return {
      dialogVisible: false,
      article: {
        content: '',
        img: '',
        summary: '',
        title: '',
        type: 1
      },
      typeList: [
        {
          label: '公司资讯',
          value: 1,
        },
        {
          label: '行业资讯',
          value: 2,
        }
      ],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmitArticle(article) {
      await Article.createArticle(article)
      this.$message.success('新建文章成功！')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    .header {
      height 59px
      .title {
        display inline-block
        float left
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
      .btn {
        display inline-block
        float right
        line-height 59px
      }
    }
  }
</style>
