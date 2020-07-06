<template>
  <el-dialog
    :title="id ? '编辑公告' : '新增公告'"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-form :ref="formName" :model="notice" label-width="100px" :rules="rules">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="notice.title">
        </el-input>
      </el-form-item>
      <el-form-item label="公告类型" prop="type">
        <el-select v-model="notice.type">
          <el-option v-for="type in types" :key="type.value"
                     :label="type.label"
                     :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="notice.status" :label="true">正常</el-radio>
        <el-radio v-model="notice.status" :label="false">关闭</el-radio>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Tinymce :id="formName" :default-content="notice.content" :height="240" @change="changeContent"/>
      </el-form-item>
    </el-form>
    <span slot="footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/base/Tinymce'
import NoticeModel from '@/models/notice'
export default {
  name: 'NoticeForm',
  components: {
    Tinymce
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      notice: {
        content: '',
        remark: '',
        status: true,
        title: '',
        type: undefined
      },
      types: [
        {
          label: '通知',
          value: 1
        }, {
          label: '公告',
          value: 2
        }
      ],
      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择公告类型', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请选择公告内容', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    formName() {
      return this.id ? 'editForm' : 'addForm'
    }
  },
  watch: {
    id(next, prev) {
      if (next) {
        this.getNotice()
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async getNotice() {
      const {
        content, remark, status, title, type
      } = await NoticeModel.getNotice(this.id)
      this.notice = {
        content, remark, status, title, type
      }
    },
    handleSubmit() {
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.$emit('submit', this.notice)
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.$refs[this.formName].resetFields()
      // this.$emit('close')
      this.$emit('update:dialogVisible', false)
    },
    changeContent(val) {
      this.notice.content = val
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
