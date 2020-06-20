<template>
  <div class="ud-btn-container">
    <el-button :loading="crud.status.cu === 2" :disabled="disabledEdit" size="mini" type="primary" icon="el-icon-edit" @click="crud.toEdit(data)" />
    <el-popover v-model="pop" placement="top" width="180" trigger="manual" @show="onPopoverShow" @hide="onPopoverHide">
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="handleCancel">取消</el-button>
        <el-button :loading="crud.dataStatus[crud.getDataId(data)].delete === 2" type="primary" size="mini" @click="handleDelete(data)">确定</el-button>
      </div>
      <el-button slot="reference" :disabled="disabledDle" type="danger" icon="el-icon-delete" size="mini" @click="toDelete" />
    </el-popover>
  </div>
</template>
<script>
export default {
  // Update & Delete
  name: 'UDOperation',
  props: {
    data: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    }
  },
  data() {
    return {
      pop: false, // 弹出框的状态
    }
  },
  methods: {
    handleCancel() {
      this.pop = false
    },
    handleDelete() {
      this.pop = true
    },
    afterDelete(data) {
      if (data === this.data) {
        this.pop = false
      }
    },
    // Popover弹出框
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    }
  }
}
</script>
