import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class OperLog {
  // eslint-disable-next-line 
  static getList({ page, size, start, end, username, keyword }) {
    return get('cms/log/oper/list/search', {
      page,
      size,
      start,
      end,
      username,
      keyword
    })
  }
  
  static deleteLog(id) {
    return _delete(`cms/log/oper/${id}`)
  }
}
