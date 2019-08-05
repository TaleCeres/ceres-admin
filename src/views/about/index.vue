<template>
  <div class="about">
    <h2>关于Ceres团队</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="position" label="职位" />
      <el-table-column prop="join_time" label="入职时间" />
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'AboutIndex',
  components: {},
  data() {
    return {
      tableData: [
        {
          id: '005',
          name: '董冬伟',
          position: '前端开发',
          join_time: '2017-04-20',
        },
        {
          id: '006',
          name: '陆梦丽',
          position: '前端开发',
          join_time: '2018-06-01',
        },
        {
          id: '007',
          name: '仇飞鸿',
          position: '前端开发',
          join_time: '2018-11-10',
        },
        {
          id: '008',
          name: '潘潇',
          position: '前端开发',
          join_time: '2016-11-23',
        },
        {
          id: '009',
          name: '朱汉挺',
          position: '前端开发',
          join_time: '2019-03-14',
        },
      ],
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
