/* eslint-disable */
/* MockJS示例: http://mockjs.com/examples.html
 */
import Mock from 'mockjs'
import { getUserInfo } from './modules/user'

Mock.mock('/mock/get_user_info', 'get', getUserInfo)

Mock.setup({
  timeout: 0, // Mock数据响应时间 
})

export default Mock
