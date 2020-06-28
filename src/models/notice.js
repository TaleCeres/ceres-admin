import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class Notice {
  // eslint-disable-next-line
  static getList({ page, size}) {
    return get('cms/notice/list', {
      page,
      size,
    })
  }

  static getNotice(id) {
    return get(`cms/notice/${id}`)
  }

  static deleteNotice(id) {
    return _delete(`cms/notice/${id}`)
  }

  static addNotice(query) {
    return post('cms/notice', query)
  }

  static updateNotice(id, query) {
    return put(`cms/notice/${id}`, query)
  }
}
