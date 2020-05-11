<template>
    <div>
      <el-card class="file-container">
        <div slot="header" >
          <el-button type="primary" icon="el-icon-upload">上传</el-button>
          <el-button-group style="margin-left: 20px">
            <el-button plain>新建文件夹</el-button>
            <el-button plain>删除</el-button>
            <el-button plain>重命名</el-button>
          </el-button-group>
          <div class="right-menu">
            <i :class="iconClass" @click="isList = !isList"></i>
          </div>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="全部素材" name="tab-all"></el-tab-pane>
          <el-tab-pane label="图片" name="tab-image"></el-tab-pane>
          <el-tab-pane label="音频" name="tab-audio"></el-tab-pane>
          <el-tab-pane label="文档" name="tab-document"></el-tab-pane>
          <el-tab-pane label="视频" name="tab-video"></el-tab-pane>
        </el-tabs>
        <ul class="list">
          <li v-for="item in fileList" :key="item.id" class="list-item">
            <el-checkbox v-model="item.checked"></el-checkbox>
            {{item.name}}
          </li>
        </ul>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      activeName: 'tab-all',
      isList: false,
      fileList: [
        {
          checked: false,
          id: 1,
          path: '/test/1',
          name: 'test.png',
        },
        {
          checked: false,
          id: 2,
          path: '/test/2',
          name: 'test.xlsx',
        }
      ]
    }
  },
  computed: {
    iconClass() {
      return this.isList ? 'fa fa-bars' : 'fa fa-th-large'
    }
  }
}
</script>

<style scoped lang="stylus">
.file-container{
  margin-top: 20px;
  .right-menu {
    float right
    line-height 40px
    font-size 25px
    color #687176
    i {
      cursor pointer
    }
    i:hover {
      color: #6D9FFF
    }
  }
  .list {
    .list-item {
      height 44px
      line-height 44px
      border-bottom 1px solid #f2f6fd
      padding 0 10px
    }
    .list-item:hover {
      background-color #f4fbff
    }
  }
}
</style>
