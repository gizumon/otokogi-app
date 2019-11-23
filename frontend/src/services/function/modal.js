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
  editPoint (point, onOk) {
    store.dispatch(OPEN_MODAL, {
      component: 'modal-point-input',
      params: {
        point: point,
        onOk: onOk
      }
    });
  },
  editEvent (event, onOk) {
    store.dispatch(OPEN_MODAL, {
      component: 'modal-event-edit',
      params: {
        event: event,
        onOk: onOk
      }
    });
  },
  close () {
    store.dispatch(CLOSE_MODAL);
  },
  closeAll () {
  }
};
