<template>
  <div :name="name">
    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    value: { type: String, require: true },
    options: { type: Array, require: true },
    name: { type: String, require: true }
  },
  methods: {
    updateValue: function (e) {
      this.$emit('input', e.target.value);
    }
  },
  mounted () {
    console.log(this.options.length, 'option.length');
    this.$emit('input', this.options[this.options.length - 1]._id);
  }
};
</script>
