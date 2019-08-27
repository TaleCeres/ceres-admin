<template>
  <div class="college-table visual">
    <el-table :data="collegeList" class="table" style="widht: 100%" height="100%">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column prop="name" label="学校" />
      <el-table-column prop="is_985" label="985" width="80" align="center" sortable>
        <template slot-scope="scope">
          {{ convertBoolean2Symbol(scope.row.is_985) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_211" label="211" width="80" align="center" sortable>
        <template slot-scope="scope">
          {{ convertBoolean2Symbol(scope.row.is_211) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_double_1st" label="双一流" width="90" align="center" sortable>
        <template slot-scope="scope">
          {{ convertBoolean2Symbol(scope.row.is_double_1st) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_public" label="类型" width="80" 
        :filters="[{ text: '公办', value: 1 }, { text: '民办', value: 2 }, { text: '独立', value: 3 }]" 
        :filter-method="filterIsPublic" 
        filter-placement="bottom-end">
        <template slot-scope="scope">
          {{ convertNum2CollegeType(scope.row.is_public) }}
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
  mounted() { },
  methods: {
    async updateTable(province) {
      const data = await CollegeModel.getList(province, 1, 200)
      this.collegeList = data.colleges
    },
    convertBoolean2Symbol(bool) {
      if (bool) return '✔'
      return '✘'
    },
    convertNum2CollegeType(num) {
      const CollegeTypeObj = {
        1: '公办',
        2: '民办',
        3: '独立'
      }
      let { [num]: collegeType = '其他' } = CollegeTypeObj // 对象结构&默认值
      return collegeType
    },
    filterIsPublic(value, row) {
      return row.is_public === value
    },
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
