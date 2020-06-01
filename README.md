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

### 规范
业务组件在html代码为 **`大驼峰命名`**，便于区分html标签和第三方组件。<br>
无slot(插槽)的组件和html标签使用 **标签闭合**，便于减少代码量。

```html
<div style="height:100%;">
  <el-container>
    <el-aside :width="sidebarWidth" class="aside">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header class="header">
        <NavBar />
      </el-header>
      <el-main class="main">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</div>
```

## 参考
### 后台管理模块
- [lin-cms-vue](https://github.com/TaleLin/lin-cms-vue) -- [线上项目](http://face.cms.7yue.pro/#/about) -- [文档](http://doc.cms.7yue.pro/)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) -- [线上项目](https://panjiachen.github.io/vue-element-admin/#/dashboard) -- [文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)

### 可视化
参考[个人作品:GraphVis](http://www.graphvis.cn/graphvis/university/index.html)

Echarts参考[术语速查手册](https://www.echartsjs.com/zh/cheat-sheet.html)，包括：常用组件说明、文档速查

## 项目目录结构
<details>
<summary>展开查看</summary>
<pre><code>
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
│   ├── router  // 前端路由
│   │   ├── modules // 每个业务模型的路由树
│   │   ├── index.js //  vue-router 入口文件
│   │   └── routes.js // vue-router 路由配置
│   ├── store // vuex状态管理文件
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
</code></pre>
</details>

目录 **`src/views/data-graph`** 的结构包含4个子目录，其中
- `overview、college-list、college-detail` 是路由 **`/data-graph`** 所有子级路由的「页面组件」
- `_common` 是路由 **`/data-graph`** 所有子级页面组件的「共用资源的目录」
- `_common` 中包含共用图片和组件，尽量减少嵌套关系。


`overview` 目录中
- 小写开头的 **`.vue`** 文件为页面组件(有且只有一个)
- 所有大写开头的 **`.vue`** 文件都是业务组件。


目录 **`/router/modules`** 中所有路由的命名、组件的规范如下:
- 一级路由对应的组件为 **`comps/layout`** 下的布局组件
- 非一级路由对应的组件
  - 有子路由，则组件为「Midlayer」
  - 无自路由，则组件为「component同名的组件」
- 嵌套最底层的「组件名」与其「路由路径名」尽量同名

```
export default {
  path: '/admin',
  name: 'Admin',
  component: undefined, // 组件为「布局组件」
  meta: {
    title: '权限管理',
    icon: 'el-icon-user',
  },
  children: [
    {
      path: '/admin/user',
      component: undefined, // 组件为「Midlayer」
      name: 'AdminUser',
      meta: {
        title: '用户管理',
        icon: 'el-icon-house',
      },
      children: [
        {
          path: '/admin/user/list', // 「路由路径名」
          component: 'admin/user/list', // 嵌套最底层的「组件名」; 组件为「component同名的组件」
          name: 'UserList',
          meta: {
            title: '用户列表',
            icon: 'el-icon-collection-tag',
          },
        },
      ],
    },
  ],
}
```

## Vue

### .vue模版格式
```vue
<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ComponentName',
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

### 自定义组件
#### 自定义Table
```
lin-table组件: https://github.com/TaleLin/lin-cms-vue/blob/master/src/components/base/table/lin-table.vue#L160
应用lin-table: https://github.com/TaleLin/lin-cms-vue/blob/master/src/views/book/BookAdd.vue

```

## Element-UI
### 组件的使用规范
- Notification(通知)显示后端的异常信息
- Message(消息提示)显示前端的异常信息
- 所有「新增、修改、删除」的接口调用，都要有弹出框作为提示(是否需要封装？))


## 后续计划
基于 TypeScript重构 ceres-admin项目，参考[TypeScript + 大型项目实战](https://juejin.im/post/5b54886ce51d45198f5c75d7#heading-3)


