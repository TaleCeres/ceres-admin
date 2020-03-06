<template>
  <div class="container">
    <div class="header">
      <div class="title">更新项目</div>
      <div class="back" @click="hanleHide">
        <fa-icon icon-name="undo" />
        返回
      </div>
    </div>
    <el-divider />
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form ref="editForm" v-loading="loading" :model="form" status-icon label-width="100px" @submit.native.prevent>
            <el-form-item label="ID" prop="id">
              <el-input v-model="form.id" size="medium" placeholder="请填写ID"></el-input>
            </el-form-item>
            <el-form-item label="类名" prop="name">
              <el-input v-model="form.name" size="medium" placeholder="请填写类名"></el-input>
            </el-form-item>
            <el-form-item label="图片链接" prop="imageUrl">
              <el-input v-model="form.imageUrl" size="medium" placeholder="请填写图片链接"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('editForm')">保 存</el-button>
              <el-button @click="resetForm('editForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProjectEdit',
  components: {},
  props: {
    editID: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      form: {
        id: '',
        name: '',
        imageUrl: '',
      },
    }
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    hanleHide() {
      this.$emit('hanleHide', false)
    },
    submitForm() {
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-divider--horizontal {
    margin: 0;
  }
.container {
  .header {
    display flex
    justify-content space-between
    align-items center
    .title {
      height 59px
      line-height 59px
      font-size 16px
      font-weight 500
    }
    .back {
      margin-right 40px
      cursor pointer
    }
  }
  .wrap {
    padding: 20px;
  }
}
</style>
