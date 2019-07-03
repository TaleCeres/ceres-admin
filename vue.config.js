const path = require('path')

module.exports = {
  chainWebpack: (config) => {
    // 设置alias(文件路径的别名)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('comps', resolve('src/components'))
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
