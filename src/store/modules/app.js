/* 页面配置 */
/* eslint-disable */
import cookies from 'js-cookie'
import config from '../../config'
import { AppStorage } from '@/utils/cookie'
import { Message } from 'element-ui'

const appStorage = new AppStorage()

const state = {
  // 侧边栏的显示
  sidebar: {
    closed: false,
  },
  // 字体大小设置
  size: cookies.get('size') || 'small',
  logo: {
    visible: true,
  },
  //
  drawer: {
    closed: !config.showLayoutSetting,
  },
  historyTag: {
    hidden: appStorage.historyTagState
  },
  layout: {
    mode: cookies.get('layoutMode') || 'default',
    options: [
      {
        value: 'default',
        label: '左右布局'
      },
      {
        value: 'vertical',
        label: '上下布局'
      },
      {
        value: 't-type',
        label: 'T型布局'
      },
    ]
  }
}

const getters = {
  layoutMode: state => state.layout.mode,
  layoutOptions: state => state.layout.options,
  drawerState: state => !state.drawer.closed,
  sidebarState: state => state.sidebar.closed,
  size: state => state.size,
  logoState: state => state.logo.visible,
  historyTagState: state => state.historyTag.hidden,
}

const mutations = {
  // 侧边栏路由是否显示
  TOGGLE_SIDEBAR: state => {
    state.sidebar.closed = !state.sidebar.closed
  },
  CLOSE_SIDEBAR: state => {
    state.sidebar.closed = true
  },
  OPEN_SIDEBAR: state => {
    state.sidebar.closed = false
  },
  // 字体大小设置
  SET_SIZE: (state, size) => {
    state.size = size
    cookies.set('size', size)
  },
  // 布局配置是否显示
  TOGGLE_DRAWER: state => {
    state.drawer.closed = !state.drawer.closed
  },
  CLOSE_DRAWER: state => {
    state.drawer.closed = true
  },
  OPEN_DRAWER: state => {
    state.drawer.closed = false
  },
  //
  TOGGLE_LOGO: state => {
    state.logo.visible = !state.logo.visible
  },
  //
  TOGGLE_HISTORY_TAG: state => {
    appStorage.historyTagState = !state.historyTag.hidden
    state.historyTag.hidden = !state.historyTag.hidden
  },
  //
  SET_LAYOUT_MODE: (state, mode) => {
    // 设置
    cookies.set('layoutMode', mode)
    state.layout.mode = mode
    state.drawer.closed = true
    // 提示
    const layoutOption = state.layout.options.find(item => item.value === mode)
    const label = layoutOption ? layoutOption.label: '左右布局'
    Message.success({
      message: `页面布局切换为:${label}`,
    })
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
