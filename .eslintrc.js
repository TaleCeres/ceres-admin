/**
 ESLint 规则中文: https://cloud.tencent.com/developer/chapter/12618
 "off" 或 0 - 关闭规则
 "warn" 或 1 - 将规则视为一个警告
 "error" 或 2 - 将规则视为一个错误
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  //使用插件
  plugins: [
    'vue', // 插件「eslint-plugin-vue」
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'prefer-const': 'off', // 对于「值不曾被修改」的变量，可以使用 let(非强制一定是 const)
    'import/extensions': 'off', // import不需要写文件扩展名
    'import/newline-after-import': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 200 }], // 代码行长度
    'consistent-return': 'off', // 函数需要返回数值
    semi: ['error', 'never'], // 无分号
    indent: ['error', 2, { // 2格缩进
      'SwitchCase': 1, // 针对switch case的缩进（默认：0）
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
