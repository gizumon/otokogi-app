<template id="base-inline-check-btn">
  <div class="form-control">
    <span class="check-btn" v-for="option in optionsData" :key="option._id" :class="{ checked: checkSelected(selectedData, option) }" @click="onClick(option)">
      {{ option.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseInlineCheckBtn',
  props: {
    selected: { type: Array, defalt: [false] },
    options: { type: Array, require: true }
  },
  data: function () {
    return {
      selectedData: this.selected,
      optionsData: this.options
    };
  },
  mounted () {
  },
  // updated () {
  //   const value = this.selectedData ? this.selectedData : null;
  //   this.$emit('selected', value);
  // },
  methods: {
    checkSelected: function (selected, option) {
      if (!selected) return false;
      let isSelected = false;
      selected.forEach(data => {
        if (data['_id'] === option['_id']) { isSelected = true; }
      });
      return isSelected;
    },
    onClick: function (selected) {
      if (this.selectedData.some(data => data['_id'] === selected['_id'])) {
        this.selectedData.splice(this.selectedData.findIndex(data => data['_id'] === selected['_id']), 1);
      } else {
        this.selectedData.push(selected);
      }
      console.log(this.selectedData, 'update');
      this.$emit('update', this.selectedData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-control {
  display: inline-flex;
  flex-direction: row;
  justify-content: start;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.2rem;
  .check-btn {
    cursor: pointer;
    display: inline-block;
    color: #ffffff;
    background: #BFBFBF;
    width: 5rem;
    height: 1.8rem;
    font-size: 0.8rem;
    line-height: 1rem;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: dashed 0.1rem gray;
    border-radius: 0.3rem;
    margin: calc((2.25rem + 0.2px) - (1.8rem + 0.4rem));
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    padding: 0.2rem 0.4rem;
    transition: 0.4s;
    &:hover{
      background-color:  #007b;
    }
    // &:active{
    //   background-color: #007bff;
    // }
    &.checked {
      border: solid 0.1rem #007bff;
      background-color:  #007bff;
      &:hover{
      background-color:  #007b;
    }
    }
  }
}

</style>
