/* eslint-disable */
import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class File {
  static async getFileList(id, page, size) {
    const data = await get(`cms/file/list?parent_id=${id}&page=${page}&size=${size}`)
    return data
  }

  // 上传文件
  static async uploadFile(id, file) {
    const data = await post(`cms/file/${id}`, file)
    return data
  }

  // 新建文件夹
  static async addFolder(parent_id, filename) {
    const data = await post('cms/file/new', { parent_id, filename })
    return data
  }

  // 批量删除文件
  static async deleteFiles(ids) {
    const data = await _delete('cms/file', { ids })
    return data
  }

  // 重命名
  static async renameFile(name, id) {
    const data = await put(`cms/file/rename?filename=${name}&file_id=${id}`)
    return data
  }


  // 查询文件详情
  static async getFile(id) {
    const data = await get(`cms/file/${id}`)
    return data
  }

  // 获取文件目录树
  static async getFileTree() {
    const data = await get('cms/file/folder')
    return data
  }

  // 复制文件
  static async copyFile(parent_id, file_id) {
    const data = await post('cms/file/copy', {parent_id, file_id})
    return data
  }

  // 移动文件
  static async moveFile(parent_id, file_id) {
    const data = await put('cms/file/move', {parent_id, file_id})
    return data
  }
}
