import Layout from 'comps/layout/default/index'
const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)

export default {
  path: '/chart',
  name: 'Chart',
  component: Layout,
  meta: {
    title: 'Chart',
    icon: 'el-icon-s-data',
  },
  children: [
    {
      path: '/chart/line',
      component: _import('chart/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', icon: 'el-icon-house' },
    },
    {
      path: '/chart/pie',
      component: _import('chart/pie'),
      name: 'PieChart',
      meta: { title: 'Pie Chart', icon: 'el-icon-collection-tag' },
    },
    {
      path: '/chart/map',
      component: _import('chart/map'),
      name: 'MapChart',
      meta: { title: 'Map Chart', icon: 'el-icon-position' },
    },
  ],
}
