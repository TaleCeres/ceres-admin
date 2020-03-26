/**
 * 全局配置
 * 设置:
 * 项目名称（title）
 * dev和prod模式下所调用的API的baseURL
 * 布局方式（layout）
 */
const isAlphaDevMode = Object.is(process.env.NODE_ENV, 'alpha')

export default {
  title: '杭州谷逸网络科技',
  baseURL: isAlphaDevMode ? process.env.VUE_APP_BASE_URL : 'http://192.168.10.58:8010/',
  layout: {
    type: 'default', // 左右布局: default; T型布局: t-type; 上下布局: vertical
    sidebar: {
      minWidth: '64px', // hide的宽度
      maxWidth: '170px', // show的宽度
    }
  },
  showLayoutSetting: false, // 默认关闭
  defaultRoute: '/home', // 默认打开的路由
}
