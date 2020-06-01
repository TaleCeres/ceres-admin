<template>
<div>
  <el-upload
    ref="upload"
    class="avatar-uploader"
    :action="uploadUrl"
    :show-file-list="false"
    :headers="uploadHeader" :on-success="handleSuccess">
    <div title="点击修改头像">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </div>
  </el-upload>

</div>
</template>

<script>
import UserModel from '@/models/user'
import defaultAvatar from 'assets/images/company/logo.png'
import config from '../../config'
import { getToken } from '../../utils/cookie'
const width = 150
const height = 150
export default {
  name: 'index',
  data() {
    return {
      defaultAvatar,
      avatar: '',
      uploadUrl: `${config.baseURL}cms/file`,
      uploadHeader: {
        Authorization: getToken()
      },
      imageUrl: ''
    }
  },
  watch: {
  },
  async created() {
    await UserModel.getToken('777@qq.com', '123456')
    await UserModel.getInfo()
  },

  methods: {
    handleSuccess(response, file, fileList) {
      if (response.error_code === 0) {
        // this.contract_no = response.data.contract_no
        this.$message.success('头像更新成功')
        this.imageUrl = response.data[0].url
      } else {
        this.$message.error(response.msg)
      }
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
