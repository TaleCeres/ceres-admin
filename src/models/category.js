import {
  post,
  get,
  put,
} from '@/utils/request'

export default class Category {
  static async getAll() {
    const data = await get('category/all')
    return data.items
  }
}
