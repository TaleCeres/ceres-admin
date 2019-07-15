import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API // api的base_url
  baseURL: 'http://39.106.133.56:8088',
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone interceptor
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
