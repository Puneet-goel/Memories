import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  FORGOTPASSWORD,
  RESETPASSWORD,
  AUTHORIZE,
} from '../constants/actionTypes';
import * as api from '../api';
import { findToken } from '../utility/index.js';

export const login = (email, password, username, check) => async (dispatch) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await api.loginUser(user);

    if (data.message === 'ok') {
      //create a token cookie
      const d = new Date();
      var days = 1;
      if (check) {
        days = 30;
      }

      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + d.toUTCString();
      document.cookie = `token=${data.token}; ${expires}; path=/;`;

      localStorage.setItem('username', username);
      localStorage.setItem('email', email);

      dispatch({
        type: LOGIN,
        payload: {
          email: email,
          username: username,
        },
      });
    }

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const logout = () => async (dispatch) => {
  try {
    //delete the token cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();

    dispatch({
      type: LOGOUT,
      payload: null,
    });

    return;
  } catch (err) {
    console.error(err);
  }
};

export const register = (email, password, username) => async (dispatch) => {
  try {
    const user = {
      email: email,
      password: password,
      username: username,
    };

    const { data } = await api.signupUser(user);

    dispatch({
      type: SIGNUP,
      payload: null,
    });

    return data.message;
  } catch (err) {
    console.error(err);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const { data } = await api.forgotPasswordUser(email);

    dispatch({
      type: FORGOTPASSWORD,
      payload: null,
    });

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const resetPassword = (id, username, password) => async (dispatch) => {
  try {
    const user = {
      id: id,
      password: password,
      username: username,
    };

    const { data } = await api.resetPasswordUser(user);

    dispatch({
      type: RESETPASSWORD,
      payload: null,
    });

    return data.message;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

export const authenticate = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const { data } = await api.authenticate(token);

    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);

    dispatch({
      type: AUTHORIZE,
      payload: data,
    });

    return;
  } catch (err) {
    console.error(err);
  }
};
