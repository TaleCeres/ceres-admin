import axios from 'axios'
import { Message } from 'element-ui'
import { Base64 } from 'js-base64'
import { getToken } from '@/utils/auth'
import store from '@/store'


// 自定义实例默认值
const service = axios.create({
  baseURL: 'https://server.mini-shop.ivinetrue.com',
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
})


// request interceptor 添加请求拦截器
service.interceptors.request.use(
  config => {
    console.log('store.getters.token', getToken())
    // let each request carry token --['Authorization'] as a custom key.
    // please modify it according to the actual situation.
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    const token = `${getToken()}:faildPassword`
    config.headers.Authorization = `Basic ${Base64.encode(token)}`
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

// respone interceptor 添加响应拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log(`err${error}`)
    Message({
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default service
