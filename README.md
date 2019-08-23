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

## Vue模版格式
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


