<template>
  <div :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<script>
export default {
  name: 'Swagger',
  data() {
    return {
      src: `${process.env.VUE_APP_BASE_URL}/apidocs/#/`,
      height: `${document.documentElement.clientHeight - 94.5}px;`
    }
  },
  mounted() {
    console.log('process.env.VUE_APP_BASE_URL', process.env)
  }
}
</script>
