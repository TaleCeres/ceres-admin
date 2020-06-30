<template>
  <el-dialog title="新增Banner" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :ref="addForm" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BannerAddsForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.$refs.addForm.resetFields()
      this.$emit('close')
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
