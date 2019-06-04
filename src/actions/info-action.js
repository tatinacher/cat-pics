function invalidLogin() {
  return {
    type: 'INVALID_LOGIN'
  };
}
function copyImgInfo() {
  return {
    type: 'COPY_IMAGE_TO_CLIPBOARD'
  };
}

function welcomeUsername(name) {
  return {
    type: 'WELCOME_USER',
    name: name
  };
}

function clear() {
  return {
    type: 'CLEAR_INFO'
  };
}

function logOut() {
  return {
    type: 'LOG_OUT_INFO'
  };
}

const invalidAuthData = () => dispatch => dispatch(invalidLogin());
const welcomeUser = (name) => dispatch => dispatch(welcomeUsername(name));
const copyInfo = () => dispatch => dispatch(copyImgInfo());
const clearInfo = () => dispatch => dispatch(clear());
const logOutInfo = () => dispatch => dispatch(logOut());

export default {invalidAuthData, copyInfo, welcomeUser, clearInfo,logOutInfo};


