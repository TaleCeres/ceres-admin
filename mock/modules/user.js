/* eslint-disable */
import Mock from 'mockjs'
const { Random } = Mock

export const getUserInfo = options => {
  // options为前端的 request信息
  const data = {
    name: Random.cname(),
    email: Random.email('qq.com'),
    age: Random.integer(18, 60),
  }
  return {
    data,
    error_code: 200,
    msg: '',
  }
}
