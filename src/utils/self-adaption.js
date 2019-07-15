export function debounce(func, wait, immediate) {
  let timeout; let args; let context; let timestamp; let
    result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = null; args = null
        }
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = null; args = null
    }

    return result
  }
}


export function getColor() {
  return ['#749f83', '#d48265', '#bda29a', '#c23531', '#2f4554', '#61a0a8', '#91c7ae', '#ca8622', '#6e7074', '#546570', '#c4ccd3']
}

// 排序、求和
export function filterChart(arr, key, no) {
  if (arr.length === 0) {
    return []
  }
  arr.sort((a, b) => -(a[key] - b[key]))
  let newArr = arr.slice(0, no)
  let other = { name: 'Other', value: 0 }
  for (let i = no; i < arr.length; i++) {
    other.value += arr[i][key]
  }
  newArr.push(other)
  return newArr
}
