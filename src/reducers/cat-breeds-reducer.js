import * as types from '../actions/actionTypes';

const initialState = {
  catBreeds: [],
  isLoaded: false,
  isLoadedImage: false
};

export function catBreedsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_CAT_BREEDS:
      return Object.assign({}, state, {
        catBreeds: action.data,
        isLoaded: true
      });
    case types.SAVE_CAT_IMAGES:
      return Object.assign({}, state, {
        catBreedImages: action.data,
        isLoadedImage: true
      });
    default:
      return state;
  }
}
