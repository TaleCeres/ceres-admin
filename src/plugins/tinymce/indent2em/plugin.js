/* eslint-disable */
tinymce.PluginManager.add('indent2em', (editor, url) => {
  let pluginName = '首行缩进'
  let global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools')
  let indent2em_val = editor.getParam('indent2em_val', '2em')
  let doAct = function () {
    let { dom } = editor
    let blocks = editor.selection.getSelectedBlocks()
    let act = ''
    global$1.each(blocks, block => {
      if (act == '') {
        act = dom.getStyle(block, 'text-indent') == indent2em_val ? 'remove' : 'add'
      }
      if (act == 'add') {
        dom.setStyle(block, 'text-indent', indent2em_val)
      } else {
        let style = dom.getAttrib(block, 'style')
        style = style.replace(/text-indent:[\s]*2em;/ig, '')
        dom.setAttrib(block, 'style', style)
      }
    })
  }

  editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('indent2em', '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>')

  let stateSelectorAdapter = function (editor, selector) {
    return function (buttonApi) {
      return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind
    }
  }

  editor.ui.registry.addToggleButton('indent2em', {
    icon: 'indent2em',
    tooltip: pluginName,
    onAction() {
      doAct()
    },
    onSetup: stateSelectorAdapter(editor, [
      '*[style*="text-indent"]',
      '*[data-mce-style*="text-indent"]',
    ])
  })

  editor.ui.registry.addMenuItem('indent2em', {
    text: pluginName,
    onAction() {
      doAct()
    }
  })

  editor.addCommand('indent2em', doAct)

  return {
    getMetadata() {
      return {
        name: pluginName,
        url: 'http://tinymce.ax-z.cn/more-plugins/indent2em.php',
      }
    }
  }
})
