import Vue from 'vue'

export function loadPlugins(pluginList) {
  pluginList.forEach(plugin => Vue.use(plugin))
}
