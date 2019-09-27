/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { Notification } from 'element-ui'
import { getToken } from './cookie'

// 拦截器，使用mock数据代替
let interceptorList = [
  'get+user'
]

// 创建请求实例
const _axios = axios.create({
  baseURL: 'https://api.izjgk.com/v1',
  timeout: 5 * 1000 // 请求超时时间设置
})

// request 拦截
_axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    Promise.reject(error)
  },
)

// request 拦截
_axios.interceptors.response.use(response => {
  const { error_code: errorCode, msg, data } = response.data
  // 成功的errorCode为0，其他都是
  if (errorCode >= 100) {
    Notification({
      message: msg || '服务端异常',
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(msg || '服务端异常')
  }
  return data
  }, error => {
    return Promise.reject(error)
  },
)

export default _axios
