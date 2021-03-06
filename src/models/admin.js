/* eslint-disable */
import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class Admin {
  static getAllPermissions() {
    return get('cms/auth/all')
  }
  static async getAllGroups() {
    const groups = await get('cms/group/all')
    return groups
  }

  static async getGroup(id) {
    const group = await get(`cms/group/${id}`)
    return group
  }

  static async createGroup(name, info, auth_ids) {
    const res = await post('cms/group', {
      name,
      info,
      auth_ids,
    })
    return res
  }

  static async updateGroup(name, info, id) {
    const res = await put(`cms/group/${id}`, {
      name,
      info,
    })
    return res
  }

  static async dispatchPermissions(group_id, auth_ids) {
    const res = await put('cms/auth/append', {
      group_id,
      auth_ids,
    })
    return res
  }

  static async removePermissions(group_id, auth_ids) {
    const res = await put('cms/auth/remove', {
      group_id,
      auth_ids,
    })
    return res
  }

  static async deleteGroup(id) {
    const group = await _delete(`cms/group/${id}`)
    return group
  }
}
