<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <ArticleForm title="编辑文章" :article="article"  @submit-article="handleSubmitArticle" />
  </el-card>
</template>

<script type="text/ecmascript-6">
import Article from '@/models/article'
import ArticleForm from './ArticleForm'
export default {
  name: 'ArticleEdit',
  components: {
    ArticleForm
  },
  data() {
    return {
      article: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id || 1
    }
  },
  mounted() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      this.article = await Article.getArticle(this.id)
    },
    async handleSubmitArticle(article) {
      await Article.editArticle(this.id, article)
      this.$message.success('更新文章成功！')
    }
  }
}
</script>

<style scoped>

</style>
