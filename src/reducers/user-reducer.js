import * as types from '../actions/actionTypes';

const initialState = {
  user: {'catlover': 'catlover', 'user': 'user'}
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_USER:
      return Object.assign({}, state, {
        user: action.data,
      });
    default:
      return state;
  }
}
