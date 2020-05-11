import {
  post,
  get,
  put,
  _delete
} from '@/utils/request'

export default class College {
  // 获取所有路由结构
  static async getRouteTree() {
    const data = await get('cms/route/tree')
    return data
  }

  // 按ID删除路由节点
  static async deleteRoute(id) {
    const data = await _delete(`cms/route/${id}`)
    return data
  }

  // 新增路由
  static async createRoute(route) {
    const data = await post('cms/route/', route)
    return data
  }

  // 拖动后保存路由
  static async updateRoute(tree) {
    const data = await put('cms/route/tree', tree)
    return data
  }

  // 按ID编辑路由
  static async editRoute(id, route) {
    const data = await put(`cms/route/${id}`, route)
    return data
  }
}
