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
  timeout: 5000 // request timeout
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
  const res = response.data
  // 成功的error_code为0，其他都是
  if (res.error_code >= 100) {
    Notification({
      message: res.msg || '服务端异常',
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(res.msg || '服务端异常')
  }
  return res.data
  }, error => {
    return Promise.reject(error)
  },
)

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
  return _axios({
    method: 'post',
    url,
    data,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
  return _axios({
    method: 'get',
    url,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params,
  })
}

export default _axios
