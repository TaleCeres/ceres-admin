<h1 align="center">
  Ceres Admin
</h1>

<h4 align="center">
	后台管理系统模版
</h4>


## 项目启动

```
npm install # 安装依赖
npm run dev # 编译 & 热更新(开发模式)
npm run build # 编译 & 优化(生成模式)
npm run test # 运行测试
npm run lint # 格式化 & 修复
npm run commit # 自动化 git commit

# pm2 相关
npm run start # pm2 启动已指定的项目(即 pm2 start app.js --name='ceres-admin') 
npm run stop # pm2 关闭已指定的项目(即 pm2 delete ceres-admin) 
npm run restart # pm2 重启已指定的项目
npm run buildart # 重新编译，并使用pm2 重启已指定的项目
```

## git commmit 规范
[参考](https://www.jianshu.com/p/28617fd95c67) 
```
git add . # 提交至「暂存区」
npm run commit # 提交至「本地仓库」，结合 npm scripts自动运行 commit规范
```

## 组件
组件的3个级别:
- 页面组件
  - 用于 vue-router 的页面，作为路由的渲染，不会被复用
  - 主要承载当前页面的 HTML 结构，会包含数据获取、数据整理、数据可视化等常规业务。
- 业务组件
  - 只在当前项目中会用到，不具有通用性，而且会包含一些业务。
- 基础组件
  - 不包含业务，具有独立、具体的功能

页面组件可能包含多个业务组件，业务组件包含多个基础组件

## 可视化
参考[个人作品:GraphVis](http://www.graphvis.cn/graphvis/university/index.html)

## 项目目录结构
```
.
├── README.md
├── babel.config.js
├── mock
│   ├── index.js
│   └── modules
├── node_modules
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── data
│   │   ├── icons
│   │   ├── images
│   │   └── styles
│   ├── components
│   │   ├── base
│   │   └── layout
│   ├── config
│   │   └── index.js
│   ├── main.js
│   ├── mixins
│   │   └── resize.js
│   ├── models
│   │   ├── college.js
│   │   └── user.js
│   ├── plugins
│   │   ├── custom.js
│   │   └── element.js
│   ├── router
│   │   ├── index.js
│   │   ├── modules
│   │   └── routes.js
│   ├── store
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── modules
│   │   ├── mutations.js
│   │   └── state.js
│   ├── utils
│   │   ├── cookie.js
│   │   ├── index.js
│   │   └── request.js
│   └── views
│       ├── about
│       ├── admin
│       ├── chart
│       ├── dashboard
│       ├── data-graph
│       ├── _common
│       │   ├── CollegeTable.vue
│       │   ├── bg.png
│       │   └── header.png
│       ├── college-detail
│       │   └── index.vue
│       ├── college-list
│       │   ├── CollegeEnrollNumPieChart.vue
│       │   ├── CollegeKeyMajorNumPieChart.vue
│       │   ├── CollegeTotalMajorNumPieChart.vue
│       │   ├── ProvinceMap.vue
│       │   └── index.vue
│       ├─── overview
│       │   ├── ChinaMap
│       │   ├── DonutForCooperateType.vue
│       │   ├── DonutForSchoolLevel.vue
│       │   ├── HeatMap
│       │   ├── TopCity
│       │   ├── TopProvince.vue
│       │   └── index.vue
│       ├── error-page
│       ├── form
│       ├── guide
│       ├── home
│       ├── login
│       └── table
└── vue.config.js
```

目录 **`src/views/data-graph`** 的结构包含4个子目录，其中 `overview、college-list、college-detail` 是路由 **`/data-graph`** 所有子级路由的页面组件，`_common` 是路由 **`/data-graph`** 所有子级页面组件的共用资源的目录。


`overview` 目录中，小写开头的 **`.vue`** 文件为页面组件(有且只有一个)，所有大写开头的 **`.vue`** 文件都是业务组件。

`_common` 中包含共用图片和组件，尽量减少嵌套关系。

## Vue

### .vue模版格式
```vue
<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
```


## 后续计划
基于 TypeScript重构 ceres-admin项目，参考[TypeScript + 大型项目实战](https://juejin.im/post/5b54886ce51d45198f5c75d7#heading-3)


