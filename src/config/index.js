/**
 * 全局配置
 * 设置:
 * 项目名称（title）
 * dev和prod模式下所调用的API的baseURL
 * 布局方式（layout）
 */

export default {
  title: '票据管理平台',
  baseURL: process.env.VUE_APP_BASE_URL,
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
