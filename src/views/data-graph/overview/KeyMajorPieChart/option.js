// 参考 https://www.echartsjs.com/examples/editor.html?c=bar-gradient
import color from 'assets/data/color'
export default {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}所 ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    textStyle: {
      color: '#fff'
    },
    data: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', '普通']
  },
  color: color.category12,
  series: [
    {
      name: '院校类型',
      type: 'pie',
      center: ['50%', '60%'],
      radius: ['0%', '50%'],
      avoidLabelOverlap: true, // avoidLabelOverlap:是否启用防止标签重叠策略，默认开启
      label: {
        fontSize: 16,
        formatter: '{b}类学科 \n {c}个 ({d}%)',
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: [
        { name: 'A+', value: 91 },
        { name: 'A', value: 67 },
        { name: 'A-', value: 147 },
        { name: 'B+', value: 295 },
        { name: 'B', value: 257 },
        { name: 'B-', value: 245 },
        { name: 'C+', value: 222 },
        { name: 'C', value: 174 },
        { name: 'C-', value: 163 },
        { name: '普通', value: 16313 }
      ]
    }
  ]
}
