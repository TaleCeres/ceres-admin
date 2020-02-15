/**
 * [axios 文档](http://www.axios-js.com/docs/)
 * [axios怎么获取到error中的状态值&具体信息](https://blog.csdn.net/weixin_41838204/article/details/82107567)
 */
/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import { Notification } from 'element-ui'
import { getToken } from './cookie'
import config from '../config'

// 拦截器，使用mock数据代替
let interceptorList = [
  'get+user'
]

// 创建请求实例
const _axios = axios.create({
  baseURL: config.baseURL,
  timeout: 5 * 1000 // 请求超时时间设置
})

// request 拦截器设置
_axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    Promise.reject(error)
  },
)

// response 拦截器设置
_axios.interceptors.response.use(
  response => {
    const { error_code: errorCode, msg, data } = response.data
    // 成功的errorCode为0
    if (errorCode >= 100) {
      Notification({
        message: msg || '服务端异常',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(msg || '服务端异常')
    }
    return data
  },
  error => {
    return Promise.reject(error)
  },
)

export default _axios
