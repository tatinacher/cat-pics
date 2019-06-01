import {combineReducers} from 'redux';
import {catReducer} from './cat-reducer';
import {userReducer} from './user-reducer';
import {infoReducer} from './info-reducer';

export const rootReducer = combineReducers({
    cats: catReducer,
    users: userReducer,
    info: infoReducer
  });
  