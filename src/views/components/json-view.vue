<template>
  <el-card>
    <JsonView :json="JsonData" />
  </el-card>
</template>

<script type="text/ecmascript-6">
import JsonView from 'comps/base/JsonView'
export default {
  name: 'AboutIndex',
  components: { JsonView },
  data() {
    return {
      JsonData: {
        error: 0,
        status: 'success',
        date: '2019-09-18',
        results: [{
          currentCity: '嘉兴',
          weather_data: [{
            date: '今天（周三）',
            weather: '多云',
            wind: '微风',
            temperature: '23℃'
          },
          {
            date: '明天（周四）',
            weather: '雷阵雨转中雨',
            wind: '微风',
            temperature: '29～22℃'
          }
          ]
        },
        {
          currentCity: '合肥市',
          weather_data: [{
            date: '今天（周三）',
            weather: '多云',
            wind: '东风3-4级',
            temperature: '27℃'
          },
          {
            date: '明天（周四）',
            weather: '多云',
            wind: '东北风3-4级',
            temperature: '35～27℃'
          }
          ]
        }
        ]
      }
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
