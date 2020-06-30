import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Category {
  static async getAll() {
    const data = await get('v1/category/all')
    return data
  }
}
