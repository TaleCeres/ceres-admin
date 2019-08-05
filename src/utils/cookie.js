import cookies from 'js-cookie'
import { Base64 } from 'js-base64'

/**
 * 存储tokens
 * @param {string} token
 */
export function saveToken(token) {
  cookies.set('token', `Basic ${Base64.encode(`${token}:randomPassword`)}`)
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
