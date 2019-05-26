import * as types from '../actions/actionTypes';

const initialState = {
  randomPic: '',
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
    case types.SAVE_RANDOM_PIC:
        return Object.assign({}, state, {
          randomPic: action.data
        });
    case types.ADD_CAT_IMAGE:
      let breeds = state.catBreeds.slice();
      breeds.forEach(el => {
        if (el.id === action.id){
          if (el.images){
            el.images.push(action.image);
          } else {
            el.images = [action.image];
          }
        }
      })
      return Object.assign({}, state, {
        catBreeds: breeds,
        isLoadedImage: true
      });
    default:
      return state;
  }
}
