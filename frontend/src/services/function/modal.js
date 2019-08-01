const store = require('../../assets/store').default;
const {OPEN_MODAL} = require('../../assets/store/action-types');
const {CLOSE_MODAL} = require('../../assets/store/action-types');

export default {
  alert (message, onOk) {
    store.dispatch(OPEN_MODAL, {
      component: 'modal-alert',
      params: {
        message: message,
        onOk: onOk
      }
    });
  },
  confirm (message, onOk, onNg) {
  },
  openComponent (component) {
  },
  close () {
    store.dispatch(CLOSE_MODAL);
  },
  closeAll () {
  }
};
