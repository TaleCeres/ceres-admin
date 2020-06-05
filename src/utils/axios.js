/**
 * [axios 文档](http://www.axios-js.com/docs/)
 * [axios怎么获取到error中的状态值&具体信息](https://blog.csdn.net/weixin_41838204/article/details/82107567)
 */
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { Notification, Message } from 'element-ui'
import { getToken, removeToken } from './cookie'
import config from '../config'

// 拦截器，使用mock数据代替
let interceptorList = [
  'get+user'
]

// 创建请求实例
const _axios = axios.create({
  baseURL: config.baseURL,
  // timeout: 5 * 1000 // 请求超时时间设置
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
    Message({
      message: error.response.data.msg,
      type: "error"
    })
    if (error.response.data.error_code === 1002) {
      removeToken()
      window.location.reload()
    }
    return Promise.reject(error)
  },
)

// eslint-disable-next-line
Plugin.install = function(Vue, options) {
  // eslint-disable-next-line
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}

if (!Vue.axios) {
  Vue.use(Plugin)
}

export default _axios
