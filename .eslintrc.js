/**
 * ESLint 规则中文: https://cloud.tencent.com/developer/chapter/12618
 * 'off' 或 0 - 关闭规则
 * 'warn' 或 1 - 将规则视为一个警告
 * 'error' 或 2 - 将规则视为一个错误
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
    /* Vue 规范
     * Vue风格指南: https://cn.vuejs.org/v2/style-guide/index.html
     * Vue规范文档: https://eslint.vuejs.org/rules
     */
    'vue/order-in-components': ['warn', {
      'order': [ // 组件&实例的选项的顺序(参考: https://cn.vuejs.org/v2/style-guide/index.html#组件-实例的选项的顺序-推荐)
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        ['template', 'render'],
        'renderError'
      ]
    }],
    'vue/attributes-order': ['warn', {
      'order': [
        'DEFINITION', // 定义 is
        'LIST_RENDERING',// 列表渲染 v-for
        'CONDITIONALS', // 条件渲染 v-if, v-else-if, v-else, v-show, v-cloak
        'RENDER_MODIFIERS',// 渲染方式 v-pre, v-once
        'GLOBAL', // 全局感知 id
        'UNIQUE', // 唯一的特性 ref, key, slot, v-slot
        'TWO_WAY_BINDING', // 双向绑定 v-model
        'OTHER_DIRECTIVES', // 其他指令 v-custom-directive
        'OTHER_ATTR', // 其他特性 custom-prop="foo", v-bind:prop="foo", :prop="foo"
        'EVENTS', // 事件 (组件事件监听器) @click="functionCall", v-on="event"
        'CONTENT' // 内容 (覆写元素的内容) v-html, v-text
      ]
    }],
    'vue/prop-name-casing': ['error', 'camelCase'], // prop name 使用小驼峰命名法
    'vue/attribute-hyphenation': ['error', 'always'], // 特性name 使用连字符: <MyComponent my-prop="prop" />
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    /* js 规范

    */
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 使用控制台
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off', // 修改函数参数
    'quote-props': 'off',
    'comma-dangle': 'off', // 逗号
    'arrow-parens': ['error', 'as-needed'],
    'linebreak-style': 'off',
    'prefer-const': 'off', // 对于「值不曾被修改」的变量，可以使用 let(非强制一定是 const)
    'import/extensions': 'off', // import不需要写文件扩展名
    'import/newline-after-import': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { code: 200 }], // 代码行长度
    'consistent-return': 'off', // 函数需要返回数值
    'no-trailing-spaces': 'off', // 行末有多余空格
    semi: ['error', 'never'], // 无分号
    indent: ['error', 2, { // 2格缩进
      'SwitchCase': 1, // 针对switch case的缩进（默认：0）
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
