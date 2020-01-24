/* eslint-disable key-spacing */
<template>
  <div id="homePointInputTable">
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
            <th class="table-index">
              No.<br>
              <font-awesome-icon v-if="options.sortOrders > 0" icon="sort-amount-up" @click="options.sortOrders = options.sortOrders * -1" :class="'fontColor_white'"/>
              <font-awesome-icon v-else icon="sort-amount-down" @click="options.sortOrders = options.sortOrders * -1" :class="'fontColor_white'"/>
            </th>
            <th v-for="participant in participantsData" :key="participant._id">
              {{ participant.name }}
            </th>
            <th class="table-index"><font-awesome-icon icon="trash-alt" :class="'fontColor_darkred'" /></th>
          </tr>
        </thead>
        <tbody>
          <tr class="point-summary">
            <td><font-awesome-icon icon="trophy" :class="'fontColor_lightYellow'" /></td>
            <td v-for="participant in participantsData" :key="participant._id">
              {{ pointSum(participant._id) }}
            </td>
            <td><font-awesome-icon icon="minus" /></td>
          </tr>
          <!-- <template v-if="prepareData.length < 1">
            <tr class="col-12">NO DATA</tr>
          </template> -->
          <!-- <template v-else> -->
          <tr class="points-list" v-for="point in prepareData" :key="point._id">
            <th class="table-index"><a class="circle-btn" @click="editRecord(point)">{{ point.no }}</a></th>
              <td v-for="participant in participantsData" :key="participant._id" class="t-col-5">
                <span v-if="participant._id === point.userId">{{ point.point }}</span>
                <span v-else>0</span>
              </td>
            <td><font-awesome-icon icon="trash-alt" :class="'fontColor_darkred clickable'" @click="deleteRecordById(point._id)" /></td>
          </tr>
          <!-- </template> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Common from '../../assets/function/common';
import PointService from '../../services/PointService';
import Modal from '../../services/function/modal';

const common = new Common();

export default {
  name: 'HomePointInputTable',
  props: {
    participants: {type: Array, require: true},
    points: {type: Array, require: true}
  },
  data: function () {
    return {
      participantsData: this.participants,
      pointsData: this.points,
      page: 0,
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
      let displayedData = this.pointsData.slice();

      for (let i = 0; i < displayedData.length; i++) {
        displayedData[i].no = i + 1;
      }
      if (this.options.sortOrders < 0) {
        displayedData = displayedData.reverse();
      }

      if (displayedData.length < this.options.recordsNum) {
        return displayedData;
      }
      return displayedData.slice(startIndex, (startIndex + this.options.recordsNum));
    }
  },
  methods: {
    flipPage: function (page) {
      const pageFunc = {
        'first': () => { this.page = 1; },
        'back': () => { this.page += -1; },
        'next': () => { this.page += 1; },
        'last': () => { this.page = Math.ceil(this.pointsData.length / this.options.recordsNum); }
      };
      pageFunc[page]();
    },
    deleteRecordById: async function (id) {
      const status = await PointService.deleteById(id);
      if (status >= 200 && status <= 299) {
        console.log('success delete point!');
        this.$emit('isEdited');
      } else {
        console.erro(`ERR: Error point delete for ${id}\nstatus: ${status}`);
      }
    },
    pointSum: function (userId) {
      let sum = 0;
      this.pointsData.forEach(point => {
        if (point.userId === userId) {
          sum = sum + Number(point.point);
        }
      });
      return common.addFigure(sum);
    },
    editRecord: function (point) {
      var self = this;
      Modal.editPoint(point, async function (registPoint) {
        const status = await PointService.update(registPoint._id, registPoint);
        if (status >= 200 && status <= 299) {
          console.log('success update point!');
          Modal.alert('Update success!');
          self.$emit('isEdited');
        } else {
          console.error(`ERR: Error point update for ${registPoint._id}\nstatus: ${status}`);
        }
      });
    }
  },
  watch: {
    pointsData: function () {
      this.page = 1;
      // this.isFirstPage = (this.page <= 1);
      // this.isLastPage = (this.page >= Math.ceil(this.pointsData.length / this.options.recordsNum));
    },
    page: function () {
      this.isFirstPage = (this.page <= 1);
      this.isLastPage = (this.page >= Math.ceil(this.pointsData.length / this.options.recordsNum));
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
        padding: 0.5rem 0.25rem;
        white-space: wrap;
        word-break: break-all;
        vertical-align: center;
        &.table-index {
          width: 3rem;
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
            width: 3rem;
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
        &.points-list {
          background-color: #efefef;
          color: #393939;
          > th {
            color: #393939;
          }
          > td {
            background-color: #efefef;
            color: #778899;
            font-size: 1rem;
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
