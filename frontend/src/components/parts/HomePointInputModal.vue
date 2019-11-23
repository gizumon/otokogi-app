<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="closeModal()">
        <div class="modal-container" v-on:click.stop="">
          <div>
            <h3 class="title">Point Edit</h3>
          </div>
          <div class="modal-body">
            <slot name="participant">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">participant</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="user-alt" /></div>
                  </div>
                  <base-select name="participant" :options="eventParticipants" :selected="selectedParticipant" @input="onUpdateSelectedParticipant" />
                </div>
              </div>
            </slot>
            <slot name="category">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">Category</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="question-circle" /></div>
                  </div>
                  <base-select name="category" :options="categories" :selected="selectedCategory" @input="onUpdateSelectedCategory"/>
                </div>
              </div>
            </slot>
            <slot name="point">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">Point</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="yen-sign" /></div>
                  </div>
                  <input class="form-control" type="tel" name="point" placeholder="1000" v-model="inputPoint" >
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div class="btns">
                <button type="button" class="btn btn04 w-auto" @click="ok()">OK</button>
                <button type="button" class="btn btn04 w-auto" @click="cancel()">Close</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Modal from '../../services/function/modal';
import BaseSelect from '../parts/BaseSelect';

import UserService from '../../services/UserService';
import CategoryService from '../../services/CategoryService';

export default {
  props: {
    params: {
      point: Object,
      onOk: Function
    }
  },
  data: function () {
    return {
      selectedEventId: '',
      eventParticipants: [],
      categories: [],
      selectedParticipant: {},
      selectedCategory: {},
      inputPoint: null
    };
  },
  components: {
    'base-select': BaseSelect
  },
  created () {
    this.selectedEventId = this.params.point.eventId;
    this.eventParticipants = UserService.eventParticipants;
    this.categories = CategoryService.categories;
    this.$set(this.selectedParticipant, '_id', this.params.point.userId);
    this.$set(this.selectedCategory, '_id', this.params.point.category);
    this.inputPoint = this.params.point.point;
  },
  methods: {
    ok () {
      let registPoint = this.params.point;

      registPoint['userId'] = this.selectedParticipant['_id'];
      registPoint['category'] = this.selectedCategory['name'];
      registPoint['point'] = this.inputPoint;
      console.log(this.selectedParticipant['_id']);
      console.log(this.selectedCategory['name']);
      console.log(this.inputPoint);

      if (registPoint['userId'] && registPoint['category'] && registPoint['point']) {
        this.params.onOk(registPoint);
        Modal.close();
      } else {
        Modal.alert('Please fill out all input');
      }
    },
    cancel () {
      Modal.close();
    },
    onUpdateSelectedParticipant: function (selectedValue) {
      this.$set(this, 'selectedParticipant', selectedValue);
    },
    onUpdateSelectedCategory: function (selectedValue) {
      this.$set(this, 'selectedCategory', selectedValue);
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.modal-container {
  display: inline-block;
  width: auto;
  max-width: 450px;
  min-width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: block;
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
