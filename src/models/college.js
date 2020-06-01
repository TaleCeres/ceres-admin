import {
  post,
  get,
  put,
} from '@/utils/request'

export default class College {
  static async getList(province, index = 1, size = 10) {
    const data = await get('college/group', {
      index,
      size,
      province,
    })
    return data
  }

  // 高校近几年的趋势分析
  static async getMajorListOfTrendAnalyse(id) {
    const data = await get(`college/${id}/trend_analyse`)
    return data
  }

  // 高校的重点学科
}
