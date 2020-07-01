<template>
  <div class="image-upload">
    <el-upload
      class="img-uploader"
      action=""
      :show-file-list="false"
      :http-request="uploadFile"
      :on-success="handleImageSuccess">
      <div v-if="img">
        <img :src="img" class="img" alt="暂无图片">
        <div class="control">
          <i class="el-icon-close del" title="删除" @click.prevent.stop="delImage()"></i>
          <div class="preview" title="更换图片">
            <i class="el-icon-edit"></i>
          </div>
          <div class="control-bottom">
            <i
              class="control-bottom-btn el-icon-view"
              title="预览"
              style="cursor: pointer;"
              @click.stop="previewImg()"
            ></i>
          </div>
        </div>
      </div>
      <div v-else class="img-uploader-icon">
        <i slot="trigger" class="el-icon-plus"></i>
      </div>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="img" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  components: {},
  props: {
    img: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    uploadFile(param) {
      this.$emit('uploadImage', param)
    },
    handleImageSuccess(res, file) {
      const url = URL.createObjectURL(file.raw)
      this.$emit('update:img', url)
    },
    delImage() {
      this.$emit('update:img', '')
    },
    previewImg() {
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .image-upload {
    .img-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .img-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .img-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
</style>
