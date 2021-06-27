<template>
  <el-card class="table-container">
    <div class="container" v-loading="loading">
      <div class="input-content-wrapper">
        <el-form ref="form" :model="form">
          <div class="input-content">
            <div class="input-content-item">
              <div class="title">基础参数:</div>
              <el-form-item>
                <el-input v-model="form.baseValue" type="textarea" />
              </el-form-item>
            </div>
            <div class="input-content-item">
              <div class="title">变化规则:</div>
              <el-form-item>
                <el-input v-model="form.paramValue" type="textarea" :placeholder="paramValuePlaceholder"/>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="btn-wrapper">
        <el-button class="btn-item" type="primary" @click="handleRules">转换<i class="el-icon-right el-icon--right"></i></el-button>
        <el-button class="btn-item" type="warning" @click="handleClearInputValue">清空<i class="el-icon-delete el-icon--right"></i></el-button>
      </div>
      <div class="result">
        <div class="title">转换结果:</div>
        <el-input class="result-content" v-model="resultValue" type="textarea" />
      </div>
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TicketTransfor',
  data() {
    return {
      loading: false,
      form: {
        baseValue: '',
        paramValue: '',
      },
      resultValue: '',
      paramValuePlaceholder: '请输入\n温州银行+0.1\n宁波银行-0.11\n金华银行+0.25\n...\n等等(数量不限)\n\n1.以上银行可以重名\n2.承兑人名后必须跟上+/-运算符'
    }
  },
  methods: {
    validateUniqueAcceptance(acceptance, ruleList) {
      let checked = true
      checked = ruleList.every(item => {
        return item.acceptance === acceptance
      })
      if (!checked) {
        this.$message({
          message: '筛选条件不合规，承兑人必须都一致',
          type: 'warning',
          duration: 3000
        })
      }
      return checked
    },

    parseRules() {
      const filterObjList = []
      if (this.form.baseValue === '') {
        this.$message({
          message: '筛选条件不能为空',
          type: 'warning',
        })
        this.loading = false
      } else {
        this.form.baseValue = this.form.baseValue.trim()
        const ruleStringList = this.form.baseValue.split('\n')
        ruleStringList.forEach((item, index) => {
          const arr = item.split(',')
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
        })
      }
      // 判断数据的唯一（必须都是同一家银行）
      // ...
      return filterObjList
    },

    parseParam() {
      const filterObjList = []
      let isStop = false
      if (this.form.paramValue === '') {
        this.$message({
          message: '变化规则不能为空',
          type: 'warning'
        })
        this.loading = false
        return
      } else {
        this.form.paramValue = this.form.paramValue.trim()
        const ruleStringList = this.form.paramValue.split('\n')
        ruleStringList.forEach((item, index) => {
          let arr = []
          if (!(item.includes('+') || item.includes('-'))) {
            this.$message({
              message: `第${index + 1}行变化规则必须要有+/-运算符`,
              type: 'warning'
            })
            isStop = true
          }
          if (item.includes('+')) {
            arr = item.split('+')
            filterObjList.push({
              acceptance: arr[0], // 承兑人名称
              interestDiff: parseFloat(arr[1]), // 年化｜利率
            })
          } else {
            arr = item.split('-')
            filterObjList.push({
              acceptance: arr[0], // 承兑人名称
              interestDiff: 0 - parseFloat(arr[1]), // 年化｜利率
            })
          }
        })
      }
      if (isStop) {
        this.loading = false
        return
      }
      return filterObjList
    },

    handleRules() {
      this.loading = true
      let ruleObjList = this.parseRules()
      // 校验规则
      if (!this.validateUniqueAcceptance(ruleObjList[0].acceptance, ruleObjList)) {
        this.loading = false
        return
      }
      let paramObjList = this.parseParam()
      let resultObjList = []
      paramObjList.forEach(paramItem => {
        ruleObjList.forEach(ruleItem => {
          let num = (ruleItem.annual_interest * 1000 + paramItem.interestDiff * 1000) / 1000
          let annualInterest = Number(num.toFixed(5))
          resultObjList.push({
            acceptance: paramItem.acceptance, // 承兑人名称
            annual_interest: annualInterest, // 年化｜利率
            amt_start: ruleItem.amt_start, // 票面金额最小值
            amt_end: ruleItem.amt_end, // 票面金额最大值
            dis_day_start: ruleItem.dis_day_start, // 日期区间最小值
            dis_day_end: ruleItem.dis_day_end, // 日期区间最大值
            is_flaw: ruleItem.is_flaw === 'true', // 是否有瑕疵
            fee_of_lakh: ruleItem.fee_of_lakh, // 每十万扣息
            is_open_margin: ruleItem.is_open_margin === 'true' // 是否有保单
          })
        })
      })
      setTimeout(() => {
        this.resultValue = ''
        resultObjList.forEach(item => {
          this.resultValue += `${Object.values(item).join(',')}\n`
        })
        this.resultValue = this.resultValue.trim()
        this.loading = false
        this.$message({
          message: '完成票据信息换算',
          type: 'success',
          duration: 2000
        })
      }, 500)
    },

    handleClearInputValue() {
      this.form = {
        baseValue: '',
        paramValue: '',
      }
      this.resultValue = ''

      this.$message({
        message: '已清空输入内容',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.table-container {
  height: 100%;
  .container {
    display: flex;
    justify-content: space-around;
    .input-content-wrapper {
      flex: 0 0 45%;
      .input-content {
        display: flex;
        flex-direction: column;
        .input-content-item {
          >>> textarea {
            min-height: 300px !important;
          }
        }
      }
    }
    .btn-wrapper {
      width: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .btn-item {
        width: 100px;
        margin-left: 10px;
      }
      .btn-item + .btn-item {
        margin-top: 20px
        margin-left: 10px;
      }
    }
    .result {
      flex: 0 0 45%;
      .result-content {
        width: 100%;
        >>> textarea {
          min-height: 635px !important;
        }
      }
    }
  }
}

</style>
