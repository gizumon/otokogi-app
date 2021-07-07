<template>
  <select class="form-control" :name="name" @input="updateValue" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" :multiple="isMultiSelectable" >
    <option v-if="selected === null" selected class="msg" :value=null disabled>{{ msg }}</option>
    <option v-else class="msg" :value=null disabled>{{ msg }}</option>
    <option v-for="option in optionsData" :value="option" :key="option._id" :selected="isSelected(selected, option)">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    selected: { type: Object },
    options: { type: Array, require: true },
    name: { type: String, require: true },
    isMultiSelectable: { type: Boolean, default: false }
  },
  data: function () {
    return {
      optionsData: this.options,
      msg: `- Select ${this.name} -`
    };
  },
  mounted () {
  },
  // updated () {
  //   const value = this.selectedData ? this.selectedData : null;
  //   this.$emit('selected', value);
  // },
  methods: {
    updateValue: function (e) {
      let value = e.target.selectedOptions ? e.target.selectedOptions[0]._value : null;
      this.$emit('input', value);
      this.$emit('selected', value);
    },
    isSelected: function (selected, option) {
      if (!selected) return false;
      return selected['_id'] === option['_id'];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
  color: #b95a42;
}
</style>
