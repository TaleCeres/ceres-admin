<template>
  <div class="container">
    <Tinymce upload_url="http://dev.lin.colorful3.com/cms/file/" @change="change" />
  </div>
</template>

<script type="text/ecmascript-6">
import Tinymce from '@/components/base/Tinymce'
export default {
  name: 'index',
  components: {
    Tinymce,
  },
  data() {
    return {
      text: 'this is default content',
    }
  },
  methods: {
    change(val) {
      // console.log(val)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
