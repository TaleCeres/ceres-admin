<template>
  <el-card class="table-container">
    <el-form ref="form" v-loading="loading" :model="form" label-width="10px">
      <span class="title">年化利率浮动:</span>
      <el-input v-model="annualInterest" placeholder="输入0.1 或 -0.1等"
                style="margin-left: 10px; margin-bottom: 20px; width: 340px"
                clearable @clear="handleClearAnnualInterest">
      </el-input>
      <el-row :gutter="10">
        <el-col :span="12" class="input-item">
          <div class="title">过滤规则:</div>
          <el-form-item>
            <el-input v-model="form.rulesText" type="textarea" :rows="20" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="input-item">
          <div class="title">新的规则:</div>
          <el-form-item>
            <el-input v-model="form.newRulesText" type="textarea" :rows="20" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="warning" @click="onClear">清空</el-button>
        <el-button type="primary" @click="onSubmit">处理</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TicketUtil',
  data() {
    return {
      loading: false,
      ruleNum: 0,
      errorRuleNum: 0,
      errorRuleList: [],
      annualInterest: undefined,
      form: {
        rulesText: '',
        newRulesText: ''
      },
    }
  },
  methods: {
    handleRules() {
      const filterObjList = []
      this.errorRuleList = []
      this.errorRuleNum = 0
      if (this.form.rulesText === '') {
        this.$message({
          message: '筛选条件不能为空',
          type: 'warning'
        })
      } else {
        this.form.rulesText = this.form.rulesText.trim()
        const ruleStringList = this.form.rulesText.split('\n')
        this.ruleNum = ruleStringList.length
        ruleStringList.forEach((item, index) => {
          const arr = item.split(',')
          if (arr.length !== 9) {
            this.errorRuleNum += 1
            this.errorRuleList.push({ index, content: item, msg: '参数个数错误' })
          } else {
            filterObjList.push({
              acceptance: arr[0], // 承兑人名称
              annual_interest: arr[1], // 年化｜利率
              amt_start: arr[2], // 票面金额最小值
              amt_end: arr[3], // 票面金额最大值
              dis_day_start: arr[4], // 日期区间最小值
              dis_day_end: arr[5], // 日期区间最大值
              is_flaw: arr[6] === 'true', // 是否有瑕疵
              fee_of_lakh: arr[7], // 每十万扣息
              is_open_margin: arr[8] === 'true' // 是否有保单
            })
          }
        })
      }
      if (this.errorRuleList.length !== 0) {
        this.$message({
          message: `有${this.errorRuleList.length}个筛选条件长度不符合`,
          type: 'warning',
          duration: 5000
        })
      }
      return filterObjList
    },
    handleClearAnnualInterest() {
      this.annualInterest = undefined
    },
    onClear() {
      this.annualInterest = 0
      this.form = {
        rulesText: ''
      }
    },
    onSubmit() {
      this.loading = true

      const objList = this.handleRules()
      // eslint-disable-next-line array-callback-return
      objList.map(item => {
        if (!this.annualInterest) this.annualInterest = 0
        let num = (item.annual_interest * 1000 + Number(this.annualInterest) * 1000) / 1000
        item.annual_interest = Number(num.toFixed(5))
      })
      this.form.newRulesText = ''
      objList.forEach(item => {
        this.form.newRulesText += `${Object.values(item).join(',')}\n`
      })
      this.form.newRulesText = this.form.newRulesText.trim()
      this.$message({
        message: '完成年化利率浮动调整',
        type: 'success',
        duration: 5000
      })

      this.loading = false
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.table-container {
  padding: 20px;
  .title {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .line{
    text-align: center;
  }
}
.input-item .el-form-item {
  .el-form-item__content {
    margin-left: 10px !important;
  }
}
</style>
