/* eslint-disable */
import {
  post,
  get,
  put,
} from '@/utils/request'
import { saveToken } from '../utils/cookie'

export default class User {
  /**
   * @static
   * @param {*} account 用户账号
   * @param {*} secret 密码
   */
  static async getToken(account, secret) {
    const data = await post('v1/token', {
      account,
      secret,
      type: 101,
    })
    saveToken(data.token)
  }

  static async getInfo() {
    const user = await get('v1/user')
    return user
  }

  static async getUserList(page, size) {
    const user = await get(`/cms/user/list?page=${page}&size=${size}`)
    return user
  }

  static async getUser(uid) {
    const user = await get(`/cms/user/${uid}`)
    return user
  }

  static async updateUserGroup(uid, group_id) {
    const user = await put(`/cms/user/${uid}`, { group_id })
    return user
  }
}
