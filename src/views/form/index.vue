<template>
  <div class="ipfw-setting">
    <el-form ref="form" :model="form" status-icon class="form">
      <el-form-item label="名称描述">
        <el-input v-model="form.name" class="item" style='width:616px'/>
      </el-form-item>
      <el-form :inline="true">
        <el-form-item label="制造商">
          <el-input v-model="form.make" class="item" />
        </el-form-item>
        <el-form-item label="型号" style='padding-left: 2px' class="child-item" >
          <el-input v-model="form.model" class="item" />
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="目标IP">
          <el-input v-model="form.ip" class="item" />
        </el-form-item>
        <el-form-item label="掩码" style='padding-left: 2px' class="child-item" >
          <el-input v-model="form.netmask" class="item" />
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormIndex',
  data() {
    return {
      form: {
        name: '',
        make: '',
        model: '',
        ip: '',
        netmask: '',
      }
    }
  }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">

</style>
