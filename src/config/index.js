const config = {
  company: '杭州谷逸网络科技',
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://www.ivinetrue.com/v1/' : '',
  layout: {
    type: 'default', // 左右布局: default; T型布局: t-type; 上下布局: vertical
    maxWidth: '170px',
    minWidth: '60px',
  },
}

export default config
