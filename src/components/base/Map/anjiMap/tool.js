/**
 *  echarts tooltip 自动轮播
 *  @param myChart  //初始化echarts的实例
 *  @param option   //指定图表的配置项和数据
 *  @param num      //类目数量(原因：循环时达到最大值后，使其从头开始循环)
 *  @param time     //轮播间隔时长
 */
const Event = require('events');
let count = 0;
const throwCount = new Event.EventEmitter();


export function autoHover(myChart, option, num, time) {
  let defaultData = { // 设置默认值
    time: 3000,
    num: 10,
  }
  if (!time) {
    ({ time } = defaultData)
  }
  if (!num) {
    ({ num } = defaultData)
  }

  let timeTicket = null
  if (timeTicket) clearInterval(timeTicket)
  timeTicket = setInterval(() => {
    // console.log('count', count)
    // this.$emit('sendToParent', count)
    throwCount.emit('throwCount', count);
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0, // serieIndex的索引值   可以触发多个
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: count,
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: count,
    })
    count += 1
    if (count >= num) {
      count = 0
    }
  }, time)
  myChart.on('mouseover', params => {
    clearInterval(timeTicket)
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
    })
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    })
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex,
    })
    throwCount.emit('throwCount', params.dataIndex);
  })
  myChart.on('mouseout', () => {
    if (timeTicket) clearInterval(timeTicket)
    timeTicket = setInterval(() => {
      throwCount.emit('throwCount', count);
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0, // serieIndex的索引值   可以触发多个
      })
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: count,
      })
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: count,
      })
      count += 1
      if (count >= num) {
        count = 0
      }

    }, 3000)
  })
}
export default {
  count,
  throwCount,
  autoHover
}
