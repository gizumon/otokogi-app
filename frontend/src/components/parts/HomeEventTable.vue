<template>
  <div id="homeEventTable">
    <div class="table-headers">
      <div class="left-buttons"></div>
      <div class="center-buttons">
        <li class="item"><font-awesome-icon icon="angle-double-left" :class="isFirstPage ? 'disabled' : 'clickable'" @click="flipPage(`first`)"/></li>
        <li class="item"><font-awesome-icon icon="angle-left" :class="isFirstPage ? 'disabled' : 'clickable'" @click="flipPage(`back`)"/></li>
        <li class="item">{{page}}</li>
        <li class="item"><font-awesome-icon icon="angle-right" :class="isLastPage ? 'disabled' : 'clickable'" @click="flipPage('next')"/></li>
        <li class="item"><font-awesome-icon icon="angle-double-right" :class="isLastPage ? 'disabled' : 'clickable'" @click="flipPage(`last`)"/></li>
      </div>
      <div class="right-buttons">
      </div>
    </div>
    <div class="table-container col-12">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <!-- <th @click="sortBy()" :class="{ active: options.sortKey == key }"> -->
            <th class="table-index t-col-10">
              No.<br>
              <font-awesome-icon v-if="options.sortOrders > 0" icon="sort-amount-up" @click="options.sortOrders = options.sortOrders * -1" :class="'fontColor_white'"/>
              <font-awesome-icon v-else icon="sort-amount-down" @click="options.sortOrders = options.sortOrders * -1" :class="'fontColor_white'"/>
            </th>
            <th class="table-index t-col-30 t-title">Title</th>
            <th class="table-index t-col-10 pc">Date</th>
            <!-- <th class="table-index t-col-15">Destinations</th> -->
            <th class="table-index t-col-10"><span class="pc">Total </span>P</th>
            <th class="table-index t-col-15">Win<span class="pc">ner</span></th>
            <th class="table-index t-col-15">Lose<span class="pc">r</span></th>
            <th class="table-index t-col-10"><font-awesome-icon icon="trash-alt" :class="'fontColor_darkred'" /></th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr class="point-summary">
            <td><font-awesome-icon icon="trophy" :class="'fontColor_lightYellow'" /></td>
            <td v-for="participant in participantsData" :key="participant._id">
              {{ pointSum(participant._id) }}
            </td>
            <td><font-awesome-icon icon="minus" /></td>
          </tr> -->
          <!-- <template v-if="prepareData.length < 1">
            <tr class="col-12">NO DATA</tr>
          </template> -->
          <!-- <template v-else> -->
          <tr class="events-list" v-for="record in prepareData" :key="record._id">
            <th class="table-index"><a class="circle-btn" @click="editRecord(record)">{{ record.no }}</a></th>
            <td class="td-title">{{ record.name }}</td>
            <td class="pc-col">{{ formatDate(record.dateFrom,'YY/MM') }}</td>
            <!-- <td class="td-select">
              <select class="" v-if="record.destinations.length > 0">
                <option v-for="(destination) in record.destinations" v-bind:key="destination">{{ destination }}</option>
              </select>
              <span v-else class="">No data</span>
            </td> -->
            <td class="clickable"><a @click="updateSummary(record._id)" >{{ addFigure(record.TotalPoint) }}</a></td>
            <td class="">{{ record.winner }}</td>
            <td class="">{{ record.loser }}</td>
            <td><font-awesome-icon icon="trash-alt" :class="'fontColor_darkred clickable'" @click="deleteRecordById(record._id)" /></td>
          </tr>
          <!-- </template> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Common from '../../assets/function/common';
import EventService from '../../services/EventService';
import Modal from '../../services/function/modal';
import moment from 'moment';

const common = new Common();

export default {
  name: 'HomeEventTable',
  props: {
    events: {type: Array, require: true}
  },
  data: function () {
    return {
      eventsData: [],
      page: 1,
      options: {
        sortOrders: -1,
        recordsNum: 10
      },
      isFirstPage: true,
      isLastPage: false
    };
  },
  computed: {
    prepareData: function () {
      const startIndex = (this.page - 1) * this.options.recordsNum;
      let displayedData = this.eventsData.slice();

      displayedData.sort(function (fr, bk) { return fr.no - bk.no; });
      if (this.options.sortOrders < 0) {
        displayedData = displayedData.reverse();
      }

      if (displayedData.length < this.options.recordsNum) {
        return displayedData;
      }
      return displayedData.slice(startIndex, (startIndex + this.options.recordsNum));
    }
  },
  created () {
    this.setArrayData(this.eventsData, this.events);
  },
  methods: {
    flipPage: function (page) {
      switch (page) {
        case 'first':
          this.page = 1;
          break;
        case 'back':
          this.page += -1;
          break;
        case 'next':
          this.page += 1;
          break;
        case 'last':
          this.page = Math.ceil(this.eventsData.length / this.options.recordsNum);
          break;
      }
    },
    formatDate: function (date, format) {
      return moment(date).format(format);
    },
    addFigure: function (val) {
      return common.addFigure(val);
    },
    updateSummary: async (eventId) => {
      await EventService.updateSummary(eventId);
      this.isEmit('isEdited');
    },
    setArrayData: function (target, array) {
      // targetの初期化
      target.length = 0;
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          this.$set(target, i, array[i]);
        }
      } else {
        this.$forceUpdate();
      }
    },
    editRecord: (event) => {
      Modal.editEvent(event, async (registData) => {
        console.log(registData);
        const status = await EventService.update(registData['_id'], registData);
        if (status >= 200 && status <= 299) {
          console.log('success update point!');
          Modal.alert('Update success!');
          this.$emit('isEdited');
        } else {
          console.error(`ERR: Error PATCH event for ${event._id}\nstatus: ${status}`);
        }
      });
    },
    deleteRecordById: async (id) => {
      const status = await EventService.deleteById(id);
      if (status >= 200 && status <= 299) {
        console.log('success DELETE event!');
        this.$emit('isEdited');
      } else {
        console.error(`ERR: Error DELETE event for ${id}\nstatus: ${status}`);
        Modal.alert('Failed to delete record...');
      }
    }
  },
  watch: {
    eventsData: function () {
      this.page = 1;
      this.isFirstPage = (this.page <= 1);
      this.isLastPage = (this.page >= Math.ceil(this.eventsData.length / this.options.recordsNum));
    },
    page: function () {
      this.isFirstPage = (this.page <= 1);
      this.isLastPage = (this.page >= Math.ceil(this.eventsData.length / this.options.recordsNum));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.clickable {
  cursor: pointer;
  &:hover {
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
}
.disabled {
  pointer-events: none;
  color: #c0c0c0;
  cursor: default;
}
div.table-headers {
  display: flex;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  height: 20px;
  .left-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    .item {
      display: flex;
    }
  }
  .center-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .item {
      display: block;
      width: 50px;
      margin: auto;
    }
  }
  .right-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .item {
      display: flex;
      width: 20px;
      margin: auto;
    }
  }
}
.table-container {
  display: flex;
  table {
    line-height: 1.0;
    table-layout: fixed;
    .fontColor_white {
      color: white;
      cursor: pointer;
      &:hover {
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
      }
    }
    thead {
      th {
        // display: table-cell;
        padding: 0.5rem 0.25rem;
        white-space: wrap;
        word-break: break-all;
        vertical-align: center;
        &.table-index {
          width: 2rem;
          &.t-col-05 { width: 5%; }
          &.t-col-10 { width: 10%; }
          &.t-col-15 { width: 15%; }
          &.t-col-20 { width: 20%; }
          &.t-col-30 { width: 30%; }
          &.t-col-35 { width: 35%; }
          &.t-col-40 { width: 40%; }
        }
      }
    }
    tbody {
      .fontColor_darkred {
        color: #8b0000;
        cursor: pointer;
        &:hover {
            color: #393939;
            -webkit-transform: translateY(2px);
            transform: translateY(2px);
        }
      }
      .fontColor_lightYellow {
        color: #fff8dc;
        cursor: pointer;
        &:hover {
            color: #393939;
            -webkit-transform: translateY(2px);
            transform: translateY(2px);
        }
      }
      tr {
        th {
          &.table-index {
            width: 2rem;
            .circle-btn {
              cursor: pointer;
              position: relative;
              display: inline-block;
              font-weight: bold;
              padding: 6px 0 4px;
              text-decoration: none;
              color: #4682b4;
              transition: .4s;
              &:before {
                cursor: pointer;
                position: absolute;
                content: '';
                width: 100%;
                height: 2px;
                top:100%;
                left: 0;
                border-radius: 3px;
                background:#4682b4;
                transition: .2s;
              }
              &:after {
                position: absolute;
                content: '';
                width: 100%;
                height: 2px;
                top:0;
                left: 0;
                border-radius: 3px;
                background:#4682b4;
                transition: .2s;
              }
              &:hover:before {
                top: -webkit-calc(100% - 2px);
                top: calc(100% - 2px);
              }
              &:hover:after {
                top: 2px;
              }
            }
          }
        }
        td {
          text-align: center;
        }
        &.point-summary {
          background-color: #708090;
          color: #fff8dc;
        }
        &.events-list {
          background-color: #efefef;
          color: #393939;
          > th {
            color: #393939;
          }
          > td {
            background-color: #efefef;
            color: #778899;
            font-size: 1rem;
            &.td-title {
              text-align: left;
              font-size: 0.9rem;
              word-break: break-all;
              overflow-x: auto;
            }
            &.td-select {
              margin: 0;
              padding: 0;
              select {
              width: 100%;
              height: 100%;
              border: none;
              background-color: #efefef;
              color: #778899;
              font-size: 1rem;
              padding: 0.75rem;
              }
            }
            &.clickable > a {
              cursor: pointer;
              border-bottom: solid;
              &:hover {
                border-bottom-color: darkred;
              }
            }
          }
        }
      }
    }
  }
}
div {
  text-align:center;
  margin: auto;
}
</style>
