import _axios from './axios'
let vueObj = {}
let vueArgs = []

/**
 * 注入vue实例，和要分配的
 * @param {object} obj vue实例
 * @param {array[string]} args 字符串数组
 * @returns
 */
export function inject(obj, ...args) {
  vueObj = obj
  vueArgs = args
  return this
}

/**
 * 对返回结果「统一处理」，再返回res给「调用处」
 * @param {object} obj vue实例
 * @param {array[string]} args 字符串数组
 * @param {any} res 请求的返回结果(response)
 * @return {any} 请求的返回结果(response)
 */
export function assignHandle(obj, args, res) {
  // 判断一：是否注入了Vue实例
  const isInjectVue = Object.keys(obj).length !== 0
  if (isInjectVue) {
    // 判断二：未注入参数，则默认对「$data所有参数」尝试赋值
    const isInjectArgs = args.length !== 0
    if (!isInjectArgs) args = Object.keys(obj.$data)
    args.forEach(item => {
      if (item in res) obj[item] = res[item]
    })
  }
  return res
}

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
  }).then(assignHandle.bind({}, vueObj, vueArgs))
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
  }).then(assignHandle.bind({}, vueObj, vueArgs))
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
  }).then(assignHandle.bind({}, vueObj, vueArgs))
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
  }).then(assignHandle.bind({}, vueObj, vueArgs))
}
