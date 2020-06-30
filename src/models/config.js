import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class Config {
  static getList({ page, size }) {
    return get('cms/config/list', {
      page,
      size
    })
  }
  
  static editConfig(id, data) {
    return put(`cms/config/${id}`, data)
  }

  static deleteConfig(id) {
    return _delete(`cms/config/${id}`)
  }
}
