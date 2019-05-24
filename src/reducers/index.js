import {combineReducers} from 'redux';
import {catBreedsReducer} from './cat-breeds-reducer';
import {userReducer} from './user-reducer';

export const rootReducer = combineReducers({
    cats: catBreedsReducer,
    users: userReducer
  });
  