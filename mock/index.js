/* eslint-disable */
/**
 * MockJs https://github.com/nuysoft/Mock/wiki/Getting-Started
 *  MockJS示例: http://mockjs.com/examples.html
 */
import Mock from 'mockjs'
import axios from 'axios'
import { Notification } from 'element-ui'
import { getUserInfo } from './modules/user'
import { assignHandle } from '@/utils/request'

Mock.mock('/mock/user', 'get', getUserInfo)

Mock.setup({
  timeout: 0, // Mock数据响应时间 
})

// 用于组件内调用: this.$mockApi.get('*')
Mock.$mockApi = initMockApi()

export default Mock

/**
 * 初始化axios的拦截器
 * @param {*} _axios axios实例
 */
function initAxiosInterceptor(_axios) {
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
    })
}

/**
 * 生成mock数据的4类(get、post、put、delete)请求
 * @returns
 */
function initMockApi() {
  const _axios = axios.create({})
  initAxiosInterceptor(_axios)
  let vueObj = {}
  let vueArgs = []
  const mockRequests = {
    get: path => _axios.get(`/mock/${path}`).then(assignHandle.bind({}, vueObj, vueArgs)),
    post: path => _axios.post(`/mock/${path}`).then(assignHandle.bind({}, vueObj, vueArgs)),
    put: path => _axios.put(`/mock/${path}`).then(assignHandle.bind({}, vueObj, vueArgs)),
    delete: path => _axios.delete(`/mock/${path}`).then(assignHandle.bind({}, vueObj, vueArgs)),
    inject: (obj, ...args) => {
      vueObj = obj
      vueArgs = args
      return mockRequests
    }
  }
  return mockRequests
}