<template>
  <div class="major-table visual">
    <el-table :data="majorList" class="table" style="widht: 100%" height="100%" @row-click="handleRowClick">
      <el-table-column type="selection" width="25" />
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column prop="major_name" label="专业" />
      <el-table-column label="2019年" header-align="center">
        <el-table-column prop="lowest_score_2019" label="分数" width="50" />
        <el-table-column prop="plan_num_2019" label="人数" width="50" />
      </el-table-column>
      <el-table-column label="2018年" header-align="center">
        <el-table-column prop="lowest_score_2018" label="分数" width="50" />
        <el-table-column prop="plan_num_2018" label="人数" width="50" />
      </el-table-column>
      <el-table-column label="2017年" header-align="center">
        <el-table-column prop="lowest_score_2017" label="分数" width="50" />
        <el-table-column prop="plan_num_2017" label="人数" width="50" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import CollegeModel from '@/models/college'
import { mapState } from 'vuex'
export default {
  name: 'CollegeMajorTable',
  components: {},
  data() {
    return {
      majorList: []
    }
  },
  computed: {},
  watch: {
    // 监听高校ID变化
    collegeID(val) {
      this.updateTable(val)
    }
  },
  created() { },
  mounted() {
    let { collegeID } = this.$route.query
    console.log('collegeID', collegeID)
    this.updateTable(collegeID)
  },
  methods: {
    async updateTable(collegeID) {
      this.majorList = await CollegeModel.getMajorListOfTrendAnalyse(collegeID)
    },
    handleRowClick(row) {

    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.major-table {
  position relative
  height 99%
  width 97%
  .table {
    position absolute
    top 0
    left 10px
  }
}
</style>
