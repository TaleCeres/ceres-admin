<template>
  <Editor id="tinymceEditor" :key="tinymceFlag" v-model="content" :init="tinymceInit" />
</template>
<script>
/* eslint-disable */
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import './importAll'
import FileModel from '@/models/file'
import '@/plugins/tinymce/lineheight/plugin' // 行高
import '@/plugins/tinymce/indent2em/plugin' // 首行缩进
export default {
  name: 'TinymceEditor',
  components: {
    Editor,
  },
  props: {
    defaultContent: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 500,
    },
    width: {
      type: Number,
      default: undefined,
    },
    uploadUrl: {
      type: String,
      default: '',
    },
    showMenubar: {
      type: Boolean,
      default: true,
    },
    toolbar: {
      type: String,
      default: ` undo redo
      | formatselect
      | indent2em bold italic strikethrough forecolor backcolor formatpainter
      | link image | lineheight alignleft aligncenter alignright alignjustify
      | numlist bullist outdent indent
      | removeformat
      | preview fullscreen code`,
    },
    baseUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tinymceFlag: 1,
      tinymceInit: {},
      content: '',
    }
  },
  watch: {
    content: {
      handler() {
        this.$emit('change', this.content)
      },
    },
    defaultContent: {
      handler() {
        this.content = this.defaultContent
      },
      immediate: true,
    },
  },
  created() {
    const _this = this
    this.tinymceInit = {
      language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
      skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
      content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
      language: 'zh_CN',
      height: this.height,
      width: undefined,
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      elementpath: false, // 禁用编辑器底部的状态栏
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      menubar: this.showMenubar, // 隐藏最上方menu
      plugins: `indent2em print searchreplace autolink directionality visualblocks lineheight
        visualchars template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime
        wordcount textpattern help advlist table lists paste preview fullscreen image imagetools code link`,
      toolbar: this.toolbar,
      async images_upload_handler(blobInfo, success, failure) {
        const formData = new FormData()
        const file = new File([blobInfo.blob()], blobInfo.filename(), {
          type: 'image/*',
        })
        formData.append('file', file)
        FileModel.uploadFile(0, formData).then(res => {
          if (res[0] && res[0].url) {
            success(res[0].url)
          }
        }).catch(err => failure(err))
        // const file = new File([blobInfo.blob()], blobInfo.filename(), {
        //   type: 'image/*',
        // })
        // _this
        //   .$axios({
        //     method: 'post',
        //     url: '/cms/file',
        //     data: {
        //       file,
        //     },
        //   })
        //   .then(res => {
        //     if (res[0] && res[0].url) {
        //       success(res[0].url)
        //     }
        //   })
        //   .catch(err => failure(err))
      },
    }
  },
  mounted() {
    if (this.defaultContent) {
      this.content = this.defaultContent
    }
  },
  activated() {
    this.tinymceFlag += 1
  },
}
</script>
