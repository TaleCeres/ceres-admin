<template>
  <el-card class="table-container">
    <div class="objContent"></div>
    <div class="tagList">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="handleClick(tag)"
        >
        {{tag}}
      </el-tag>
      <el-button class="button-new-tag" size="small">+ 添加</el-button>
    </div>
    <el-dialog title="详细配置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="承兑人" :label-width="'100px'">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="调整金额" :label-width="'100px'">
          <el-input v-model="form.amount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TicketTransfor',
  data() {
    return {
      dynamicTags: ['温州银行｜+0.1', '杭州银行｜-0.1', '浙商银行｜0'],
      inputValue: '',
      dialogFormVisible: false,
      form: {
        name: '',
        amount: '',
      },
    }
  },
  methods: {
    handleClick(tag) {
      let content = tag.split('｜')
      this.form = {
        name: content[0],
        amount: content[1]
      }
      this.dialogFormVisible = true
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .table-container {
    .objContent {
      width: 500px;
    }
    .tagList {
      width: 120px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  .el-tag {
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  >>> .el-icon-close {
    margin-top: 5px;
    float: right;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
