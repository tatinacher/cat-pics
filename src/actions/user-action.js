function addImageToFav(user,img) {
  return {
    type: 'ADD_IMAGE_TO_FAVORITE',
    img: img,
    user: user
  };
}

function deleteImageFromFav(user,img) {
  return {
    type: 'DELETE_IMAGE_FROM_FAVORITE',
    img: img,
    user: user
  };
}

function loginUser(user) {
  return {
    type: 'LOGIN_USER',
    user: user
  };
}

function logOutUser() {
  return {
    type: 'LOGOUT_USER'
  };
}

const addImageToFavorite = (user,img) => dispatch => dispatch(addImageToFav(user, img));
const authUser = (user) => dispatch => dispatch(loginUser(user));
const deleteImageFromFavorite = (user, img) => dispatch => dispatch(deleteImageFromFav(user, img));
const logOut = () => dispatch => dispatch(logOutUser());
export default { authUser, addImageToFavorite, deleteImageFromFavorite, logOut};