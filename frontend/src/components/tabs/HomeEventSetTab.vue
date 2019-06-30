<template>
  <div class="card m-3">
    <div class="card-header">
      <p class="card-title h4">{{ msg }}</p>
    </div>
    <div class="card-body">
    <form>
        <div class="form-row align-items-center">
        <div class="col-4 my-1">
            <label class="sr-only" for="selectName">Winner</label>
            <base-select-user />
        </div>
        <div class="col-4 my-1">
            <label class="sr-only" for="selectCategory">Category</label>
            <base-select-category />
        </div>
        <div class="col-2 my-1">
            <label class="sr-only" for="otokogiPoint">Point</label>
            <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">￥</div>
            </div>
            <input class="form-control" type="tel" name="point" placeholder="1000">
            </div>
        </div>
        <div class="col-1 pull-right my-1">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
import BaseSelectUser from '../parts/BaseSelectUser';
import BaseSelectCategory from '../parts/BaseSelectCategory';

export default {
  name: 'PointInputTab',
  data: function () {
    return {
      msg: 'Title : Otokogi APP',
      text: 'Hello world',
      showModal: false
    };
  },
  components: {
    'base-select-user': BaseSelectUser,
    'base-select-category': BaseSelectCategory
  }
  // },
  // methods: {
  //   // openModal: function () {
  //   //   this.showModal = true;
  //   // },
  //   // closeModal: function () {
  //   //   this.showModal = false;
  //   // }
  //   // DB参照 選択されたイベントの漢気ポイント一覧を表示
  //   // async get ()
  // }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
