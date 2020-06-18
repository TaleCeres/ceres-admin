import {
  post,
  get,
  put,
  _delete
} from '@/utils/request'

export default class Dict {
  // 查询字典类型列表
  static async getDictTypeList(page, size) {
    const data = await get(`cms/dict/type/list?page=${page}&size=${size}`)
    return data
  }

  // 新增字典
  static async addDict(dict) {
    const data = await post('cms/dict/type', dict)
    return data
  }

  // 删除字典
  static async deleteDictType(id) {
    const data = await _delete(`cms/dict/type/${id}`)
    return data
  }

  // 查询字典类型
  static async getDictTypeById(id) {
    const data = await get(`cms/dict/type/${id}`)
    return data
  }

  // 更新字典类型
  static async editDictType(id, dict) {
    const data = await put(`cms/dict/type/${id}`, dict)
    return data
  }

  // 查询字典数据列表
  static async getDictDataList(type, page, size) {
    const data = await get(`cms/dict/list?type=${type}&page=${page}&size=${size}`)
    return data
  }

  // 新建字典数据
  static async addDictData(dictData) {
    const data = await post('cms/dict', dictData)
    return data
  }

  // 删除字典数据
  static async deleteDictData(id) {
    const data = await _delete(`cms/dict/${id}`)
    return data
  }

  // 更新字典数据
  static async editDictData(id, dict) {
    const data = await put(`cms/dict/${id}`, dict)
    return data
  }
}
