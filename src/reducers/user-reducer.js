import * as types from '../actions/actionTypes';

const initialState = {
  user: {'catlover': {password:'catlover', img:[]}, 'user': {password: 'user', img:['https://cdn2.thecatapi.com/images/e30.jpg', 
  'https://cdn2.thecatapi.com/images/MTUwNTk4NQ.gif', 'https://cdn2.thecatapi.com/images/6rr.jpg', 
  'https://cdn2.thecatapi.com/images/3a3.jpg', 'https://cdn2.thecatapi.com/images/5CfS-e4C9.jpg', 
  'https://cdn2.thecatapi.com/images/MTcxNjkyOA.jpg', 'https://cdn2.thecatapi.com/images/c18.jpg']}},
  activeUser: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        activeUser: action.user,
      });
    case types.ADD_IMAGE_TO_FAVORITE:
      console.log(state, state.users);
      let users = state.user;
      state.user[action.user].img.push(action.img);
        return Object.assign({}, state, {
          user: users,
        });
    default:
      return state;
  }
}
