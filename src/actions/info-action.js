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

const invalidAuthData = () => dispatch => dispatch(invalidLogin());
const welcomeUser = (name) => dispatch => dispatch(welcomeUsername(name));
const copyInfo = () => dispatch => dispatch(copyImgInfo());

export default {invalidAuthData, copyInfo, welcomeUser};


