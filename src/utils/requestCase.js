import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://192.168.3.103:5001/api/',
})

service.interceptors.request.use(
  config => config,
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)
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
