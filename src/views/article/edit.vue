<template>
  <article-form title="编辑文章" :article="article"  @submit-article="handleSubmitArticle"></article-form>
</template>

<script>
import Article from '@/models/article'
import ArticleForm from './ArticleForm'
export default {
  name: 'edit',
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
      console.log(article)
      await Article.editArticle(this.id, article)
      this.$message.success('更新文章成功！')
    }
  }
}
</script>

<style scoped>

</style>
