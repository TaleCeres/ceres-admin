<template>
  <el-dialog
    :title="`${dict.id ? '修改' : '添加'}字典类型`"
    :visible.sync="dialogVisible">
    <el-form ref="dictForm" :model="dict" :rules="newDictRules" label-width="80px">
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="dict.name" placeholder="请输入字典名称"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="type">
        <el-input v-model="dict.type" placeholder="请输入字典类型"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio v-model="dict.status" :label="true">正常</el-radio>
        <el-radio v-model="dict.status" :label="false">停用</el-radio>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dict.remark" type="textarea" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DictForm',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dict: {
      type: Object,
      default: () => ({
        remark: '',
        status: true,
        type: '',
        name: ''
      })
    }
  },
  data() {
    return {
      newDictRules: {
        name: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '字典类型不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        if (!val) {
          this.$emit('close', val)
        }
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$refs.dictForm.validate(valid => {
        if (valid) {
          this.$emit('handleSubmit', this.dict)
        } else {
          return false
        }
      })
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
