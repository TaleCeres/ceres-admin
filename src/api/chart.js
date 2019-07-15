import request from '@/utils/request'
import requestCase from '@/utils/requestCase'

// chinaMap data
export function getSchoolList(name) {
  return request({
    url: `/analyze/university/province/list?province=${name}`,
    method: 'GET',
  })
}

export function getCityList() {
  return request({
    url: '/analyze/university/city',
    method: 'GET',
  })
}
// blackChinaMap data
export function getTotal() {
  return requestCase({
    url: '/probe',
    method: 'get',
  })
}

// bar data
export function getBarData(data) {
  return requestCase({
    url: '/items/total_bytes_histogram',
    method: 'get',
    params: data,
  })
}

// 获取line crosswiseBar---l7的数据
export function getL7Application(data) {
  return requestCase({
    url: '/v2/flows/tops/L7proto',
    method: 'post',
    data,
  })
}

// 获取pie gauge---log Processing rate的数据
export function getLogRate(data) {
  return requestCase({
    url: '/v2/lograte',
    method: 'get',
    data
  })
}
