import {combineReducers} from 'redux';
import {catBreedsReducer} from './cat-breeds-reducer';

export const rootReducer = combineReducers({
    cats: catBreedsReducer
  });
  