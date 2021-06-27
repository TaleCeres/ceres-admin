/**
 * model层的统一导出
 */
import user from './user'
import category from './category'
import { inject } from '@/utils/request'

export default {
  // model导出
  user,
  category,
  // 函数导出
  inject, // inject返回是此处的对象
}
