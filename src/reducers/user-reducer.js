import * as types from '../actions/actionTypes';

const initialState = {
  user: {'catlover': 
          {password:'catlover', img:new Set()}, 
          'user': 
          {password: 'user', img: new Set([ 'https://cdn2.thecatapi.com/images/e30.jpg', 
                                                    'https://cdn2.thecatapi.com/images/MTUwNTk4NQ.gif', 
                                                    'https://cdn2.thecatapi.com/images/6rr.jpg', 
                                                    'https://cdn2.thecatapi.com/images/3a3.jpg', 
                                                    'https://cdn2.thecatapi.com/images/5CfS-e4C9.jpg', 
                                                    'https://cdn2.thecatapi.com/images/MTcxNjkyOA.jpg', 
                                                    'https://cdn2.thecatapi.com/images/c18.jpg', 
                                                    'https://cdn2.thecatapi.com/images/51k.gif', 
                                                    'https://cdn2.thecatapi.com/images/2or.gif', 
                                                    'https://cdn2.thecatapi.com/images/afd.gif',
                                                    'https://cdn2.thecatapi.com/images/MTkwODU2NA.jpg',
                                                    'https://cdn2.thecatapi.com/images/aqf.jpg'])}},
  activeUser: ''
};

export function userReducer(state = initialState, action) {
  const username = action.user;
  let newSet = action.user ? new Set(state.user[username].img) : new Set();

  switch (action.type) {
    case types.SIGN_UP_USER:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          [action.username]: {password: action.password, img:new Set()}
        })
      });
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        activeUser: username,
      });
    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        activeUser: '',
      });

    case types.ADD_IMAGE_TO_FAVORITE:
        newSet.add(action.img);
        return Object.assign({}, state, {
          user: Object.assign({}, state.user, {
            [username]: Object.assign({}, state.user[username], {
              img: newSet
            })
          })
        });

    case types.DELETE_IMAGE_FROM_FAVORITE:
      newSet.delete(action.img);
        return Object.assign({}, state, {
          user: Object.assign({}, state.user, {
            [username]: Object.assign({}, state.user[username], {
              img: newSet
            })
          })
        });
    default:
      return state;
  }
}
