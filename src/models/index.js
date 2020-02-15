/**
 * model层的统一导出
 */
import user from './user'
import college from './college'
import { inject } from '@/utils/request'

export default {
  // model导出
  user,
  college,
  // 函数导出
  inject, // inject返回是此处的对象
}
