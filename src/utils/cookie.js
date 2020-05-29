// 将一切都存为字符串(数字和布尔值)
/* eslint-disable */ 
import cookies from 'js-cookie'
import { Base64 } from 'js-base64'

// 

/**
 * 存储tokens
 * @param {string} token
 */
export function saveToken(token) {
  cookies.set('token', `Basic ${Base64.encode(`${token}:$`)}`)
}

/**
 * 获得token
 */
export function getToken() {
  return cookies.get('token')
}

/**
 * 移除token
 */
export function removeToken() {
  cookies.remove('token')
  sessionStorage.clear()
  localStorage.clear()
}

export class AppStorage {
  // 应用单例模式
  constructor() {}

  get historyTagState() {
    const val = cookies.get('historyTagState')
    if (val === 'false') return false
    return true
  }

  set historyTagState(val) {
    cookies.set('historyTagState', val)
  }
}
