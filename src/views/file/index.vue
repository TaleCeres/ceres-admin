<template>
    <div>
      <el-card class="file-container" onselectstart = "return false" style = "{ -moz-user-select : none }">
        <div slot="header" >
          <el-upload
            style="display: inline-block"
            action=""
            :http-request="uploadFile"
            multiple
            :show-file-list="false"
            :limit="3">
            <el-button type="primary" icon="el-icon-upload">上传</el-button>
          </el-upload>
          <el-button-group style="margin-left: 20px">
            <el-button plain @click="addFolder">新建文件夹</el-button>
            <el-button plain :disabled="selectedIds.length === 0" @click="deleteFile">删除</el-button>
            <el-button plain :disabled="selectedIds.length !== 1 " @click="renameFile">重命名</el-button>
          </el-button-group>
          <div class="right-menu">
            <i :class="iconClass" @click="handleShowType"></i>
          </div>
        </div>

        <nav class="breadcrumb">
          <span v-for="(item, index) in breadcrumbList" :key="item.value" class="item" @click="handleBreadcrumb(item, index)">
            <span>{{item.label}}</span>
          </span>
        </nav>

        <el-table
          v-if="isTable"
          ref="fileTable"
          :data="fileList"
          style="width: 100%; margin-top: 12px"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="文件名">
            <template slot-scope="scope">
              <div v-if="scope.row.isNew">
                <i  class="fa fa-folder-o"></i>
                <el-input
                  ref="newFolder"
                  v-model="scope.row.name"
                  size="mini"
                  style="width: 120px; margin-left: 10px"></el-input>
                <el-button type="text" style="margin-left: 10px">
                  <i class="el-icon-check" @click="submitNewFolder"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-close" @click="cancelNewFolder"></i>
                </el-button>
              </div>

              <div v-else-if="extensions[scope.row.extension]">
                <i :class="extensions[scope.row.extension]" class="folder" @click="changeParent(scope.row)"></i>
                <span v-if="scope.row.rename">
                  <el-input
                    ref="rename"
                    v-model="scope.row.name"
                    size="mini"
                    style="width: 120px; margin-left: 10px"></el-input>
                  <el-button type="text" style="margin-left: 10px">
                  <i class="el-icon-check" @click="submitRename"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-close" @click="cancelRename"></i>
                </el-button>
                </span>
                <span v-else style="margin-left: 10px" class="folder" @click="changeParent(scope.row)">{{ scope.row.name }}</span>
              </div>
              <div v-else>
                <i  class="fa fa-folder-o folder" @click="changeParent(scope.row)"></i>
                <span v-if="scope.row.rename">
                  <el-input
                    ref="rename"
                    v-model="scope.row.name"
                    size="mini"
                    style="width: 120px; margin-left: 10px"></el-input>
                  <el-button type="text" style="margin-left: 10px">
                  <i class="el-icon-check" @click="submitRename"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-close" @click="cancelRename"></i>
                </el-button>
                </span>
                <span v-else class="folder" @click="changeParent(scope.row)">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="extension"
            label="类型"
            width="120">
          </el-table-column>
          <el-table-column
            label="大小">
            <template slot-scope="scope">
              <span>{{ scope.row.size || '-'  }}</span>
            </template>
          </el-table-column>
        </el-table>

        <ul v-else class="list">
          <el-checkbox v-model="checkAll"
                       :indeterminate="isIndeterminate"
                       style="margin-top: 12px"
                       @change="handleCheckAllChange">全选</el-checkbox>
          <el-divider></el-divider>
          <el-checkbox-group v-model="selectedIds" @change="handleSelectionChange">
          <li v-for="file in fileList" :key="file.id" class="list-item">

            <div v-if="file.isNew">
              <i class="fa fa-folder-o icon"></i>
              <div class="newFile">
                <el-input
                  ref="newFolder"
                  v-model="file.name"
                  size="mini"
                  style="width: 85px;">
                </el-input>
                <el-button type="text">
                  <i class="el-icon-check" @click="submitNewFolder"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-close" @click="cancelNewFolder"></i>
                </el-button>
              </div>
            </div>

            <div v-else>
              <p style="text-align: left">
                <el-checkbox class="checkbox" :label="file.id">
                  <span style="display: none">{{file.id}}</span>
                </el-checkbox>
              </p>
              <i v-if="file.extension" class="icon" :class="extensions[file.extension]" @click="changeParent(file)"></i>
              <i v-else class="fa fa-folder-o icon" @click="changeParent(file)"></i>
              <div v-if="file.rename" class="newFile">
                <el-input
                  ref="rename"
                  v-model="file.name"
                  size="mini"
                  style="width: 85px;">
                </el-input>
                <el-button type="text">
                  <i class="el-icon-check" @click="submitRename"></i>
                </el-button>
                <el-button type="text">
                  <i class="el-icon-close" @click="cancelRename"></i>
                </el-button>
              </div>
              <p v-else :title="file.name" class="file-name" @click="changeParent(file)"> {{file.name}}</p>
            </div>
          </li>
          </el-checkbox-group>
        </ul>
      </el-card>

      <div  class="pagination">
        <el-pagination
          :current-page.sync="page"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size=size
          layout="total,  sizes, prev, pager, next"
          :total=total
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import FileModel from '@/models/file'
export default {
  name: 'index',
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      parentId: 0,
      page: 1,
      size: 10,
      total: 0,
      selectedIds: [],
      activeName: 'tab-all',
      isTable: false,
      fileList: [],
      extensions: {
        jpg: 'fa fa-file-image-o',
        jpeg: 'fa fa-file-image-o',
        png: 'fa fa-file-image-o',
        pdf: 'fa fa-file-pdf-o',
        xlsx: 'fa fa-file-excel-o',
        doc: 'fa fa-file-word-o',
        docx: 'fa fa-file-word-o',
        txt: 'fa fa-file-text-o',
        mp3: 'fa fa-file-sound-o',
        ppt: 'fa fa-file-powerpoint-o',
        pptx: 'fa fa-file-powerpoint-o',
        mp4: 'fa fa-file-video-o',
        zip: 'fa fa-file-zip-o',
        md: 'fa fa-file-text-o'
      },
      breadcrumbList: [
        {
          label: '全部文件',
          value: 0
        }
      ]
    }
  },
  computed: {
    iconClass() {
      return this.isTable ? 'fa fa-bars' : 'fa fa-th-large'
    }
  },
  mounted() {
    this.getFileList()
  },
  methods: {
    handleShowType() {
      this.isTable = !this.isTable
      this.getFileList()
    },
    async getFileList() {
      const res = await FileModel.getFileList(this.parentId, this.page, this.size)
      this.fileList = res.items
      this.total = res.total
    },

    handleSizeChange(val) {
      this.size = val
      this.getFileList()
    },

    handleCurrentChange(val) {
      this.page = val
      this.getFileList()
    },

    uploadFile(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      FileModel.uploadFile(0, formData).then(res => {
        this.$message.success('上传成功')
      })
    },
    addFolder() {
      if (this.isTable) {
        if (this.$refs.newFolder === undefined && this.$refs.rename === undefined) {
          this.fileList.unshift({
            name: '新建文件夹',
            isNew: true,
            parent_id: this.parentId
          })
        }
        this.$nextTick(() => {
          if (this.$refs.newFolder !== undefined) {
            this.$refs.newFolder.focus()
          }
          if (this.$refs.rename !== undefined) {
            this.$refs.rename.focus()
          }
          this.$refs.fileTable.clearSelection()
        })
      } else {
        if (this.$refs.newFolder === undefined && this.$refs.rename === undefined) {
          this.fileList.unshift({
            name: '新建文件夹',
            isNew: true,
            parent_id: this.parentId
          })
        }
        this.$nextTick(() => {
          if (this.$refs.newFolder !== undefined) {
            this.$refs.newFolder[0].focus()
          }
          if (this.$refs.rename !== undefined) {
            this.$refs.rename[0].focus()
          }
          // this.$refs.fileTable.clearSelection()
          this.selectedIds = []
        })
      }
    },

    cancelNewFolder() {
      this.fileList.splice(0, 1)
      this.$refs.newFolder = undefined
    },

    async submitNewFolder() {
      // eslint-disable-next-line
      let { parent_id, name: filename } = this.fileList[0]
      await FileModel.addFolder(parent_id, filename)
      this.getFileList(this.parentId)
      this.$message.success('创建文件夹成功')
    },

    handleSelectionChange(selection) {
      if (this.isTable) {
        if (this.$refs.newFolder === undefined && this.$refs.rename === undefined) {
          this.selectedIds = selection.map(item => item.id)
        } else {
          this.$refs.fileTable.clearSelection()
        }
      } else if (this.$refs.newFolder === undefined && this.$refs.rename === undefined) {
        this.selectedIds = selection
        this.checkAll = selection.length === this.fileList.length
        this.isIndeterminate = selection.length > 0 && selection.length < this.fileList.length
      } else {
        this.selectedIds = []
      }
    },

    // 删除文件
    async deleteFile() {
      let ids = ''
      this.selectedIds.forEach((item, index) => {
        if (index === 0) {
          ids = item
        } else {
          ids = `${ids},${item}`
        }
      })
      await FileModel.deleteFiles(ids)
      this.getFileList(this.parentId)
      this.$message.success('删除文件成功')
    },

    // 重命名
    renameFile() {
      let [id] = this.selectedIds
      this.fileList = this.fileList.map(item => {
        if (item.id === id) {
          item.rename = true
        }
        return item
      })
      this.$nextTick(() => {
        if (this.isTable) {
          this.$refs.rename.focus()
        } else {
          this.$refs.rename[0].focus()
        }
      })
    },

    async submitRename() {
      const item = this.fileList.find(file => file.rename === true)
      await FileModel.renameFile(item.name, item.id)
      this.$message.success('重命名文件成功')
      this.getFileList(this.parentId)
    },

    cancelRename() {
      this.getFileList(this.parentId)
      this.selectedIds = []
      this.$refs.rename = undefined
    },
    async changeParent(file) {
      if (file.extension) {
        const res = await FileModel.getFile(file.id)
        this.$alert(res.url, res.name, {
          confirmButtonText: '确定',
        })
      } else {
        this.parentId = file.id
        const res = await FileModel.getFile(file.id)
        this.breadcrumbList.push({
          label: res.name,
          value: res.id
        })
        await this.getFileList()
      }
    },

    handleCheckAllChange(val) {
      this.selectedIds = val ? this.fileList.map(item => item.id) : []
      this.isIndeterminate = false
    },

    handleBreadcrumb(breadcrumb, index) {
      this.breadcrumbList.splice(index + 1, this.breadcrumbList.length - index - 1)
      this.parentId = breadcrumb.value
      this.getFileList()
    },
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

  .breadcrumb {
    font-size 14px
    .item {
      &:not(:last-child) {
        span {
          color #6D9FFF
        }
        span:hover {
          cursor pointer
        }
        &::after {
          color #6D9FFF
          padding 0 8px // 「间隔符」居中
          content '>'
          font-weight bold
          cursor default
        }
      }
      &:last-child {
        cursor default
        color #606266
      }
    }
  }

  .folder {
      cursor pointer
      margin-left 10px
  }
  .folder:hover {
      color #6D9FFF
  }

  .list {
    .list-item {
      text-align center
      float left
      padding 12px
      width 100px
      height: 100px
      overflow hidden
      font-size 40px
      .checkbox {
        display block
        left: 0
      }
      .icon {
        cursor pointer
      }
      .file-name {
        cursor: pointer;
        padding 10px 0
        height: 40px
        line-height 20px
        font-size 15px
        text-overflow ellipsis
        overflow hidden
        display bolck
        white-space nowrap
      }
      .file-name:hover {
        color #409eff
      }
      .newFile {
        width 160px
        padding 0
        margin-left -25px
        z-index 1000000
      }
    }
    .list-item:hover {
      background-color #f4fbff
    }
  }
}
.pagination {
  padding 10px 20px
  width 100%
  text-align right
}
</style>

<style lang="stylus">
  .newFile {
    .el-input__inner {
      padding 0 5px
    }
  .el-button+.el-button {
    margin-left 5px
  }
  }
  .file-container {
  .el-divider--horizontal {
    margin 12px 0
  }
  }
</style>
