import {
  LOGIN,
  LOGOUT,
  AUTHORIZE,
  SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  FOLLOW_USER,
} from '../constants/actionTypes';

const profileReducer = (profile = null, action) => {
  switch (action.type) {
    case LOGIN:
    case AUTHORIZE:
    case LOGOUT:
    case SIGNUP:
    case FORGOT_PASSWORD:
    case RESET_PASSWORD:
      return action.payload;
    case FOLLOW_USER:
      return {
        ...profile,
        following: action.payload.following,
      };
    default:
      return profile;
  }
};

export default profileReducer;
