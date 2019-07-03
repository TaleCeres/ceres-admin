<template>
  <el-table
    :data="tableData"
    @cell-click="cellClick"
  >
    <el-table-column
      v-for="label in labels"
      :key="label.label"
      :label="label.label"
    >
      <template slot-scope="scope">
        <slot :scope="scope">
          <el-input
            v-if="current.row === scope.row && current.column === scope.column.label && label.editType === 'input'"
            v-model="scope.row[label.value]"
            size="mini"
          ></el-input>
          <el-select
            v-else-if="current.row === scope.row && current.column === scope.column.label && label.editType === 'select'"
            v-model="scope.row[label.value]"
            size="mini"
          >
          </el-select>
          <el-link
            v-else-if="label.editType === 'link'"
            type="primary"
          >{{ scope.row[label.value] }}</el-link>
          <span v-else>{{ scope.row[label.value] }}</span>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Index',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editable: [],
      current: {
        row: null,
        column: null,
      },
    }
  },
  methods: {
    cellClick(row, column, cell, event) {
      this.current.row = row
      this.current.column = column.label
    },
  },
}
</script>

<style scoped lang="stylus">
</style>
