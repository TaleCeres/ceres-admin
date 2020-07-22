/* eslint-disable */
import { Random } from 'mockjs'

export const getUserInfo = options => {
  // options为前端的 request信息
  const data = {
    name: Random.cname(),
    email: Random.email('qq.com'),
    age: Random.integer(18, 60),
  }
  return {
    data,
    error_code: 0,
    msg: '',
  }
}

export const getToken = options => {
  // options为前端的 request信息
  const data = {
    token: Random.string(),
  }
  return {
    data,
    error_code: 0,
    msg: '',
  }
}
