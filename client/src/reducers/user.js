import {
  LOGIN,
  LOGOUT,
  AUTHORIZE,
  SIGNUP,
  FORGOTPASSWORD,
  RESETPASSWORD,
} from '../constants/actionTypes';

const userReducer = (user = null, action) => {
  switch (action.type) {
    case LOGIN:
    case AUTHORIZE:
    case LOGOUT:
    case SIGNUP:
    case FORGOTPASSWORD:
    case RESETPASSWORD:
      return action.payload;
    default:
      return user;
  }
};

export default userReducer;
