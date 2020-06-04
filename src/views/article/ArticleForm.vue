<template>
    <div class="container">
      <div class="header">
        <div class="title">{{title}}</div>
        <div class="btn">
          <el-button type="primary" @click="handleSubmitArticle">提交</el-button>
          <el-button type="primary" @click="backtoList">返回列表</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="article" :rules="rules" label-width="80px">
        <el-form-item label="标题" required prop="title">
          <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="article.type">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主图">
          <el-upload
            class="img-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadFile"
            :on-success="handleImageSuccess">
            <div v-if="article.img">
              <img :src="article.img" class="img">
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
        </el-form-item>
        <el-form-item label="摘要">
          <el-input
            v-model="article.summary"
            type="textarea"
            :rows="2"
            placeholder="请输入摘要">
          </el-input>
        </el-form-item>
        <el-form-item label="内容">
          <Tinymce :upload_url=uploadUrl :default-content="article.content" @change="changeContent"/>
        </el-form-item>
      </el-form>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="article.img" alt="">
      </el-dialog>
    </div>
</template>

<script>
import Article from '@/models/article'
import Tinymce from '@/components/base/Tinymce'
import FileModel from '@/models/file'
import config from '../../config'
export default {
  name: 'ArticleForm',
  components: {
    Tinymce
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    article: {
      type: Object,
      default: () => ({
        content: '',
        img: '',
        summary: '',
        title: '',
        type: 1
      })
    }
  },
  data() {
    return {
      uploadUrl: `${config.baseURL}/cms/file/68`,
      dialogVisible: false,
      typeList: [
        {
          label: '公司资讯',
          value: 1,
        },
        {
          label: '行业资讯',
          value: 2,
        }
      ],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleImageSuccess(res, file) {
      this.article.img = URL.createObjectURL(file.raw)
    },
    uploadFile(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      FileModel.uploadFile(0, formData).then(res => {
        this.article.img = res[0].url
      })
    },
    previewImg() {
      this.dialogVisible = true
    },
    delImage() {
      this.article.img = ''
    },
    changeContent(val) {
      this.article.content = val
    },

    async handleSubmitArticle() {
      this.$emit('submit-article', this.article)
      // await Article.createArticle(this.article)
      // this.$message.success('新建文章成功！')
    },

    backtoList() {
      this.$router.push({
        path: '/article/list'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    .header {
      height 59px
      .title {
        display inline-block
        float left
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
      .btn {
        display inline-block
        float right
        line-height 59px
      }
    }
  }
</style>

<style lang="stylus" rel="stylesheet/stylus">
  .container {
    .el-divider--horizontal {
      margin 12px 0 24px
    }
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
    .img {
      width: 178px;
      height: 178px;
      display: block;
    }
    .control {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.3);
      transition: all 0.3s;
      transition-delay: 0.1s;

      .del {
        background: #f4516c;
        color: white;
        position: absolute;
        display: inline-block;
        width: 1.7em;
        height: 1.5em;
        top: 0;
        right: 0;
        opacity: 0;
        border-radius: 0 0 0 1.4em;
        transition: all 0.1s;

        &::before {
          font-size: 1.4em;
          position: absolute;
          right: -1px;
          transform: scale(0.7);
        }

        &:hover {
          transform: translate(-0.5em, 0.4em) scale(1.5);
        }
      }

      .preview {
        color: white;
        font-size: 2em;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.2);
        }
      }

      .control-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 1.5em;
        display: flex;
        justify-content: space-around;
        transform: translate(0, 100%);
        transition: all 0.2s;
        transition-delay: 0.1s;
        padding: 5px 0;
        z-index 100

        .control-bottom-btn {
          transform: all 0.2s;

          &.disabled {
            color: #ababab;
            cursor: not-allowed;
          }

          &:not(.disabled):hover {
            transform: scale(1.2);
          }
        }
      }
    }

    &:hover {
      .control {
        opacity: 1;
      }

      .del {
        opacity: 1;
      }

      .control-bottom {
        transform: translate(0, 0);
      }
    }
  }
</style>
