<template>
  <div class="container">
    <h1>思维导图</h1>
    {{ wordObj }}
  </div>
</template>

<script type="text/ecmascript-6">
let wordObj = {
  name: '气候',
  children: [
    {
      name: '气温程度',
      children: [
        {
          name: 'serene',
          meaning: {
            adj: '晴朗的；平静的',
          },
          example: [
            'I went out in the rain and got saturated.',
          ],
        },
        {
          name: 'saturate',
          meaning: {
            v: '使饱和，渗透，使充满',
          },
          example: [
            'It is a dream of the white collars to go to the serene countryside in the weekends.',
          ],
        },
      ],
    },
  ],

}
// 切换节点状态（隐藏or显示）
function toggleHidden(node) {
  if (node.children) {
    node._children = node.children
    node.children = null
  } else {
    node.children = node._children
    node._children = null
  }
}


export default {
  name: 'MindMap',
  components: {},
  data() {
    return {
      wordObj,
    }
  },
  computed: {},
  created() {
  },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
