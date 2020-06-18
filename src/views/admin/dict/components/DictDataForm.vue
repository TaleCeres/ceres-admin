<template>
  <el-dialog
    :title="`${dictData.id ? '修改' : '添加'}字典数据`"
    :visible.sync="dialogVisible">
    <el-form ref="dictDataForm" :model="dictData" :rules="DictDataRules" label-width="80px">
      <el-form-item label="字典类型">
        <el-input v-model="type" disabled></el-input>
      </el-form-item>
      <el-form-item label="数据标签" prop="label">
        <el-input v-model="dictData.label" placeholder="请输入字典类型"></el-input>
      </el-form-item>
      <el-form-item label="数据键值" prop="value">
        <el-input v-model="dictData.value" placeholder="请输入数据键值"></el-input>
      </el-form-item>
      <el-form-item label="样式属性" >
        <el-input v-model="dictData.css_class" placeholder="请输入样式属性"></el-input>
      </el-form-item>
      <el-form-item label="显示排序" prop="order">
        <el-input-number v-model="dictData.order" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="回显样式" >
        <el-select v-model="dictData.list_class" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="dictData.status" :label="true">正常</el-radio>
        <el-radio v-model="dictData.status" :label="false">停用</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dictData.remark" type="textarea" placeholder="请输入备注"></el-input>
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
  name: 'DictDataForm',
  components: {},
  props: {
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false,
    },
    dictData: {
      type: Object,
      default: () => ({
        remark: '',
        status: true,
        label: '',
        value: '',
        order: 0,
        css_class: '',
        list_class: ''
      })
    }
  },
  data() {
    return {
      options: [
        {
          label: '默认',
          value: 'default'
        }, {
          label: '主要',
          value: 'primary'
        }, {
          label: '成功',
          value: 'success'
        }, {
          label: '信息',
          value: 'info'
        }, {
          label: '警告',
          value: 'warning'
        }, {
          label: '危险',
          value: 'danger'
        }
      ],
      DictDataRules: {
        label: [
          { required: true, message: '数据标签不能为空', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '数据键值不能为空', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '数据顺序不能为空', trigger: 'blur' }
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
      this.$refs.dictDataForm.validate(valid => {
        if (valid) {
          this.$emit('handleSubmit', this.dictData)
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
