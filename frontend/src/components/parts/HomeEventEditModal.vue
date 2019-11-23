<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="closeModal()">
        <div class="modal-container" v-on:click.stop="">
          <div>
            <h3 class="title">Event Edit</h3>
          </div>
          <div class="modal-body">
            <slot name="no">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">No</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <div class="text-icon">No</div>
                    </div>
                  </div>
                  <input class="form-control" type="text" name="no" placeholder="No" v-model="no" >
                </div>
              </div>
            </slot>
            <slot name="name">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">Name</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="plane" /></div>
                  </div>
                  <input class="form-control" type="text" name="point" placeholder="Event name" v-model="name" >
                </div>
              </div>
            </slot>
            <slot name="date">
              <div class="col-12 my-1">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><font-awesome-icon icon="calendar" /></span>
                  </div>
                  <input type="date" class="form-control sm-text" aria-label="from" v-model="dateFrom">
                  <input type="date" class="form-control sm-text" aria-label="to" v-model="dateTo">
                </div>
              </div>
            </slot>
            <slot name="destinations">
             <div class="col-12 my-1">
              <div class="input-group">
                <div class="input-group-prepend" id="button-addon3">
                  <span class="input-group-text"><font-awesome-icon icon="globe-asia" /></span>
                </div>
                <input type="text" class="form-control" placeholder="Pleasae input destinations with separated by [,] ..." v-model="destinations">
              </div>
             </div>
            </slot>
            <slot name="participants">
              <div class="col-12 my-1">
                <label class="sr-only" for="otokogiPoint">participants</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text"><font-awesome-icon icon="users" /></div>
                  </div>
                  <base-inline-check-btn :options="users" :selected="selected" />
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
import Common from '../../assets/function/common';
import UserService from '../../services/UserService';
import moment from 'moment';

import BaseInlineCheckBtn from '../parts/BaseInlineCheckBtn';
import Modal from '../../services/function/modal';

const common = new Common();

export default {
  props: {
    params: {
      event: Object,
      onOk: Function
    }
  },
  data: function () {
    return {
      users: [],
      selected: common.converArrayKeyName(this.params.event.participants, 'userId', '_id'),
      no: this.params.event.no,
      name: this.params.event.name,
      dateFrom: moment(this.params.event.dateFrom).format('YYYY-MM-DD'),
      dateTo: moment(this.params.event.dateTo).format('YYYY-MM-DD'),
      destinations: this.params.event.destinations,
      participants: []
    };
  },
  components: {
    'base-inline-check-btn': BaseInlineCheckBtn
  },
  created () {
    this.users = UserService.users;
  },
  methods: {
    ok () {
      let event = this.params.event;
      event['no'] = this.no;
      event['name'] = this.name.trim();
      event['destinations'] = common.splitArrayBy(this.destinations, ',');
      event['participants'] = common.converArrayKeyName(this.selected, '_id', 'userId');
      event['dateFrom'] = this.dateFrom;
      event['dateTo'] = this.dateTo;

      if (event['_id'] && event['no'] && event['name'] && event['dateFrom'] && event['dateTo'] && event['participants'].length > 0) {
        this.params.onOk(event);
        Modal.close();
      } else {
        Modal.alert('Please fill out all input');
      }
    },
    cancel () {
      Modal.close();
    }
  }
};
</script>

<style scoped lang='scss'>
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
  max-width: 90vw;
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
.input-group {
  .input-group-text {
    width: 40px;
    text-align: center;
    .text-icon {
      font-size: 0.75rem;
      font-weight: bold;
    }
  }
  .sm-text {
    font-size: 0.8rem;
    letter-spacing: -1px;
  }
}

</style>
