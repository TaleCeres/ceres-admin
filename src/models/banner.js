import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class Config {
  static getList({ page, size }) {
    return get('cms/banner/list', {
      page,
      size
    })
  }
  
  static editBanner(id, data) {
    return put(`cms/banner/${id}`, data)
  }
  
  static deleteBanner(id) {
    return _delete(`cms/banner/${id}`)
  }
}
