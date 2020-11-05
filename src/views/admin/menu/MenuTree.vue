<template>
  <draggable class="item-container"
             tag="div"
             :value="localValue"
             v-bind="dragOptions"
             @input="updateValue">
    <menu-item v-for="el in value" :key="el.id" :value="el" class="item-group" :drag-flag="dragFlag" @input="updateItem">
      <template v-slot="{ data }">
        <slot v-bind="{ data }"> </slot>
      </template>
    </menu-item>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import MenuItem from './MenuItem'
export default {
  name: 'MenuTree',
  components: {
    draggable,
    MenuItem
  },
  props: {
    value: {
      type: Array,
    },
    dragFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      localValue: [...this.value],
    }
  },
  computed: {
    dragOptions() {
      return {
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
  },
  watch: {
    value(value) {
      this.localValue = [...value]
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    updateValue(value) {
      this.localValue = value
      this.$emit('input', this.localValue)
    },
    updateItem(itemValue) {
      const index = this.localValue.findIndex(v => v.id === itemValue.id)
      this.$set(this.localValue, index, itemValue)
      this.$emit('input', this.localValue)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .item-container {
    margin: 0;
  }
  .item {
    padding: 1rem;
    border: solid #ddd 1px;
    background-color: #fefefe;
    margin-bottom 2px
  }
  .item-sub {
    margin: 0 0 0 1rem;
  }
</style>
