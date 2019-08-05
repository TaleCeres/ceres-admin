import {
  post,
  get,
  put,
} from '@/utils/request'

export default class User {
  static async getToken() {
    const data = await post('token/user', {
      account: '999@qq.com',
      secret: '123456',
      type: 100,
    })
    console.log('data', data)
  }

  static async getInfo() {
    const user = await get('api/get_user_info')
    console.log('user', user)
  }
}
