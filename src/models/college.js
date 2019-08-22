import {
  post,
  get,
  put,
} from '@/utils/request'

export default class College {
  static async getList(province, index = 1, size = 10) {
    const data = await get('college/group', {
      index,
      size,
      province,
    })
    return data
  }
}
