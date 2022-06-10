import * as api from '../api';
import { FOLLOW_USER, GET_ALL_USERS } from '../constants/actionTypes';
import { findToken } from '../utility/index.js';
//Action Creators

export const getAllUsers = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const { data } = await api.getAllUsers(token);
    if (data.message === 'ok') {
      dispatch({
        type: GET_ALL_USERS,
        payload: data.users,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const followUser = (whomToFollow, id) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    const { data } = await api.followUser(
      {
        whomToFollow: whomToFollow,
        id: id,
      },
      token,
    );

    if (data.message === 'ok') {
      dispatch({
        type: FOLLOW_USER,
        payload: whomToFollow,
      });
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};
