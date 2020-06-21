import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class LoginLog {
  static getList(page, size, start, end) {
    return get('cms/log/login/list', {
      page,
      size,
      start,
      end
    })
  }
  
  static deleteLog(id) {
    return _delete(`cms/log/login/${id}`)
  }
}
