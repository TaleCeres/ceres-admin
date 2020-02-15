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
    const data = await post('token', {
      account,
      secret,
      type: 100,
    })
    saveToken(data.token)
  }

  static async getInfo() {
    const user = await get('user')
    return user
  }
}
