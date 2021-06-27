<template>
  <el-card class="table-container">
    <div v-show="searchToggle" class="search-container">
      <el-select v-model="queryCondition.ticketType" class="search-item" placeholder="票据类型" clearable @change="handleInitCurrentPage" @clear="handleClearTicketType">
        <el-option v-for="item in ['银票', '财票', '商票']" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="queryCondition.isFlaw" class="search-item" placeholder="瑕疵情况" clearable @change="handleInitCurrentPage" @clear="handleClearFlaw">
        <el-option v-for="item in [{key: '有瑕疵', value: false}, {key: '无瑕疵', value: true}]" :key="item.key" :label="item.key" :value="item.value"></el-option>
      </el-select>

      <div style="margin: 10px 10px 10px 0;">
        <span style="margin-right: 10px;">承兑人:</span>
        <el-input v-model="queryCondition.bankName" class="search-item" style="width: 260px" placeholder="支持模糊查询" clearable @clear="handleClearBankName"></el-input>
      </div>

      <div style="margin: 10px 10px 10px 0;">
        <span>金额(万元)范围:</span>
        <el-input v-model.number="queryCondition.minFund" placeholder="启始金额" suffix-icon="el-icon-money" style="margin: 0 10px; width: 120px"></el-input>
        <span>~</span>
        <el-input v-model.number="queryCondition.maxFund" placeholder="结束金额" suffix-icon="el-icon-money" style="margin: 0 10px; width: 120px"></el-input>
      </div>
      <div style="margin: 10px 10px 10px 0;">
        <span style="margin-right: 10px;">到期范围:</span>
        <el-date-picker v-model="queryCondition.timeInterval" type="daterange" align="right" unlink-panels clearable
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        value-format="timestamp" :picker-options="pickerOptions" @change="handleDatePick">
        </el-date-picker>
      </div>
      <el-button icon="el-icon-search" type="primary" @click="handleInitCurrentPage">搜索</el-button>
      <el-button icon="el-icon-refresh" type="warning" @click="resetQuery">重置</el-button>
    </div>

    <div class="header">
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
                     @handleColumnChange="handleColumnChange"
                     @handleCheckAllChange="handleCheckAllChange"
                     @toggleSearch="toggleSearch"
                     @refresh="getList"/>
    </div>
    <CeresTable
      v-loading="loading"
      :pagination="pagination"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      :current-page="currentPage"
      @sortChange="changeTableSort"
      @currentChange="currentChange"
      @handleSizeChange="handleSizeChange"
    />
  </el-card>
</template>

<script type="text/ecmascript-6">
import TicketModel from '@/models/ticket'
import crudMixin from '@/mixins/crud'

export default {
  name: 'TicketIndex',
  components: {},
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
      currentPage: 1,
      pagination: {
        pageSize: 10,
        pageTotal: 0
      },
      queryCondition: {
        bankName: undefined,
        ticketType: undefined,
        isFlaw: undefined,
        minFund: undefined,
        maxFund: undefined,
        startTime: undefined,
        endTime: undefined,
        timeInterval: [],
        orderColumn: undefined,
        sortType: undefined,
      },
      tableData: [

      ],
      operate: [

      ],
      tableColumn: [
        { label: '序号', type: 'index', width: '60', visible: true },
        { prop: 'publish_time', label: '发布日', width: '140', sortable: 'custom', visible: true },
        {
          prop: 'end_time',
          label: '到期日',
          width: '100',
          visible: true,
          sortable: 'custom',
          render: (row, column, cell) => (<el-link type="success">{row.end_time}</el-link>)
          // render: (row, column, cell) => {
          //   let startTime = (new Date(row.end_time)).getTime()
          //   let endTime = startTime + 3600 * 1000 * 24 // 一天后
          //   return (
          //     <el-link onclick={ this.handleClickEndTime.bind(this, { startTime, endTime }) }>{row.end_time}</el-link>
          //   )
          // }
        },
        {
          prop: 'bank_name',
          label: '承兑人',
          visible: true,
          render: (row, column, cell) => (<el-link onclick={ this.handleClickBankName.bind(this, row.bank_name) }>{row.bank_name}</el-link>)
        },
        { prop: 'ticket_price', label: '金额(万元)', width: '110', sortable: 'custom', visible: true },
        {
          prop: 'year_quote',
          label: '年息',
          width: '100',
          sortable: 'custom',
          visible: true,
          render: (row, column, cell) => (<span>{`${row.year_quote}%`}</span>),
        },
        { prop: 'sell_price', label: '每十万扣息', width: '110', sortable: 'custom', visible: true },
        {
          prop: 'flaw_description',
          label: '瑕疵',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            if (row.is_flaw) {
              return (
                <span style="color: green">{row.flaw_description}</span>
              )
            }
            return (
              <span style="color: red">{row.flaw_description}</span>
            )
          },
          visible: true },
        { prop: 'pay_name', label: '结算通道', width: '80', visible: true },
        {
          prop: 'ticket_type',
          label: '票据类型',
          width: '80',
          visible: true,
          render: (row, column, cell) => {
            if (row.ticket_type === '银票') {
              return (
                <el-tag type="">{row.ticket_type}</el-tag>
              )
            }
            if (row.ticket_type === '财票') {
              return (
                <el-tag type="success">{row.ticket_type}</el-tag>
              )
            }
            return (
              <el-tag type="warning">{row.ticket_type}</el-tag>
            )
          },
        },
        {
          prop: 'order_status_desc',
          label: '订单状态',
          width: '80',
          visible: true,
          render: (row, column, cell) => (<el-tag type="success" effect="dark">{row.order_status_desc}</el-tag>)
        },
        { prop: 'ticket_src', label: '来源', width: '60', visible: true },
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime())
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime())
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '90天以内',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime())
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '91-129天',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 91)
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 129)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '130天-187天',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 130)
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 187)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '188天-330天',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date(new Date().toLocaleDateString())
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 188)
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 330)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '331天以上',
          onClick(picker) {
            const start = new Date(new Date().toLocaleDateString())
            const end = new Date('2099-12-31')
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 331)
            picker.$emit('pick', [start, end])
          }
        }]
      },
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      // eslint-disable-next-line camelcase
      let query = {
        page: this.currentPage,
        size: this.pagination.pageSize,
      }
      const { current_page: currentPage, items, total } = await TicketModel.getList({ ...query, ...this.queryCondition })
      this.currentPage = currentPage
      this.tableData = [...items]
      this.pagination.pageTotal = total
      this.loading = false
    },
    // 切换页数
    currentChange(val) {
      this.currentPage = val
      this.getList()
    },
    // 切换「数量/每页」
    handleSizeChange(val) {
      this.pagination.pageSize = val
      this.currentChange(1)
    },
    // 切换排序
    changeTableSort(val) {
      this.queryCondition.orderColumn = val.column.prop
      this.queryCondition.sortType = val.column.order
      this.currentChange(1)
    },
    handleClearTicketType() {
      this.queryCondition.ticketType = undefined
      this.currentChange(1)
    },
    handleClearFlaw() {
      this.queryCondition.isFlaw = undefined
      this.currentChange(1)
    },
    handleClearBankName() {
      this.queryCondition.bankName = undefined
      this.currentChange(1)
    },
    // 分页回到首页
    handleInitCurrentPage() {
      this.currentChange(1)
    },
    // 处理到期范围，也适用于清空到期范围
    handleDatePick(val) {
      if (val == null) {
        // 清空到期范围
        this.queryCondition.startTime = undefined
        this.queryCondition.endTime = undefined
      } else {
        this.queryCondition.startTime = val[0] / 1000
        this.queryCondition.endTime = val[1] / 1000
      }
      this.handleInitCurrentPage()
    },
    handleClickBankName(bankName) {
      this.queryCondition.bankName = bankName
      this.handleInitCurrentPage()
    },
    handleClickEndTime(timeInterval) {
      let [startTime, endTime] = [new Date(), new Date()]
      startTime.setTime(timeInterval.startTime)
      endTime.setTime(timeInterval.endTime)
      this.queryCondition.timeInterval = [startTime, endTime]
      this.queryCondition.startTime = timeInterval.startTime / 1000
      this.queryCondition.endTime = timeInterval.endTime / 1000
      this.handleInitCurrentPage()
    },
    resetQuery() {
      this.queryCondition = {

      }
      this.getList()
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    .header {
      display flex
      height 60px
      align-items center
      .crud-opts-right {

      }
    }
    .path {
      color #1890ff
      margin-left 10px
    }
  }
</style>
