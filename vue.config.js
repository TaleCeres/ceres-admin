const path = require('path')
const port = 8080 // dev port

module.exports = {
  configureWebpack: {
    devtool: 'source-map', // cheap-module-source-map & source-map
  },
  devServer: {
    port: port,
    proxy: {
      // 文档 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
      '/mock': {
        target: `http://localhost:${port}/mock`,
        // pathRewrite: {'^/api' : ''}, // 如果接口本身没有/api, 需要通过pathRewrite来重写了地址
      },
    },
  },
  chainWebpack: (config) => {
    // 设置alias(文件路径的别名)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('comps', resolve('src/components'))
      .set('node_modules', resolve('node_modules'))
    /*
    自动化导入 Stylus
    链接: https://cli.vuejs.org/zh/guide/css.html#自动化导入
    */
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

  },
  pluginOptions: {
    'style-resources-loader': {
      'patterns': [
        path.resolve(__dirname, './src/assets/styles/variable.styl'),
      ]
    }
  },
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variable.styl'),
      ],
    })
}
