<template>
    <div>
      Ueditor(支持各种富文本引入)
      <VueUeditorWrap v-model="content" :config="ueditorConfig" style="line-height: 1"  @before-init="addCustomButtom" />
    </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
// Ueditor的配置参数
const ueditorConfig = {
  autoHeightEnabled: false, // 高度自动被内容撑开
  initialFrameHeight: '640', // 初始化的高度
  initialFrameWidth: '800', // 初始化的宽度
  UEDITOR_HOME_URL: '/UEditor/'
}

export default {
  name: 'index',
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      ueditorConfig,
      content: '',
      editorHandler: null
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    addCustomButtom() {
      let _this = this
      window.UE.registerUI('video-button', (editor, uiName) => {
        _this.editorHandler = editor
        editor.registerCommand(uiName, {
          execCommand() {}
        })
        let btn = new window.UE.ui.Button({
          name: uiName,
          title: '视频',
          cssRules: "background-image: url('http://oss.51anquan.com/video.png') !important;background-size: cover;",
          onclick() {
            _this.dialogVisibleVideo = true
          }
        })
        editor.addListener('selectionchange', () => {
          let state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })
        return btn
      }, -1)
      window.UE.registerUI('image-button', (editor, uiName) => {
        editor.registerCommand(uiName, {
          execCommand() {
            _this.editorHandler = editor
          }
        })
        let btn = new window.UE.ui.Button({
          name: uiName,
          title: '图片',
          cssRules: "background-image: url('http://oss.51anquan.com/image.png') !important;background-size: cover;",
          onclick() {
            _this.handleShowImgList(2)
          }
        })
        editor.addListener('selectionchange', () => {
          let state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })
        return btn
      }, -2)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
