/* eslint-disable */
import {
  post,
  get,
  put, _delete,
} from '@/utils/request'

export default class Article {
  static getArticleList({page, size, type}) {
    return get(`cms/article/list?page=${page}&size=${size}&type=${type}`)
  }

  static getArticle(id) {
    return get(`cms/article/${id}`)
  }

  static createArticle(article) {
    return post('cms/article', article)
  }

  static editArticle(id, article) {
    return put(`cms/article/${id}`, article)
  }

  static deleteArticle(id) {
    return _delete(`cms/article/${id}`)
  }
}
