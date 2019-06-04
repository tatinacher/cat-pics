import * as types from '../actions/actionTypes';

const initialState = {
  info: '',  
  color: ''
};

export function infoReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_INFO:
      return Object.assign({}, state, {
        text: '',
        color: ''
      });
    case types.LOG_OUT_INFO:
      return Object.assign({}, state, {
        text: 'Goodbye!',
        color: 'is-success'
      });
    case types.INVALID_LOGIN:
      return Object.assign({}, state, {
        text: 'Invalid login or password. Please, try again.',
        color: 'is-warning'
      });
    case types.COPY_IMAGE_TO_CLIPBOARD:
      return Object.assign({}, state, {
        text: 'Image copied to clipboard!',
        color: 'is-success'
      });
    case types.WELCOME_USER:
      return Object.assign({}, state, {
        text: 'Hello, '+ action.name + "!",
        color: 'is-success'
      });
    default:
      return state;
  }
}
