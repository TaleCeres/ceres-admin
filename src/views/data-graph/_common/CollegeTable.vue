<template>
  <div class="college-table visual">
    <el-table :data="collegeList" class="table" style="widht: 100%" height="100%">
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="name" label="学校" />
      <el-table-column prop="is_985" label="985" width="50" align="center">
        <template slot-scope="scope">
          {{ chooseBooleanSymbol(scope.row.is_985) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_211" label="211" width="50" align="center">
        <template slot-scope="scope">
          {{ chooseBooleanSymbol(scope.row.is_211) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_double_1st" label="双一流" width="70" align="center">
        <template slot-scope="scope">
          {{ chooseBooleanSymbol(scope.row.is_double_1st) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_public" label="类型" width="50">
        <template slot-scope="scope">
          {{ scope.row.is_public? '公办': '私立'  }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import CollegeModel from '@/models/college'
import { mapState } from 'vuex'
export default {
  name: 'CollegeTable',
  components: {},
  data() {
    return {
      collegeList: [],
    }
  },
  computed: {
    ...mapState({
      province: state => state.visual.geo.province
    })
  },
  watch: {
    // 监听省份变化(失败)
    province(val) {
      this.updateTable(val)
    }
  },
  async created() {
    let { province } = this.$route.query
    this.updateTable(province)
  },
  mounted() {
  },
  methods: {
    chooseBooleanSymbol(bool) {
      if (bool) return '✔'
      return '✘'
    },
    async updateTable(province) {
      const data = await CollegeModel.getList(province, 1, 30)
      this.collegeList = data.colleges
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.college-table {
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
