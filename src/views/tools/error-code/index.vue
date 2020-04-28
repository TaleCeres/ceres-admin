<template>
  <div :style="'height:'+ height">
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto" />
  </div>
</template>

<script>
export default {
  name: 'ErrorCode',
  data() {
    return {
      src: `${process.env.VUE_APP_BASE_URL}/error_code`,
      height: `${document.documentElement.clientHeight - 94.5}px;`
    }
  },
}
</script>
