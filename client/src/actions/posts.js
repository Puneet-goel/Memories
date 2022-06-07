import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../constants/actionTypes';
import * as api from '../api';
import { findToken } from '../utility/index.js';

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const { data } = await api.fetchPosts(token);
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, file) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('message', post.message);
    formData.append('tags', post.tags);
    formData.append('selectedFile', file);

    const { data } = await api.createPost(formData, token);
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post, file) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('message', post.message);
    formData.append('tags', post.tags);
    formData.append('selectedFile', file);

    const { data } = await api.updatePost(id, formData, token);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return false;
    }

    await api.deletePost(id, token);
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const { data } = await api.likePost(id, token);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (id) => {
  try {
    const token = findToken();

    const { data } = await api.fetchUserPosts(id, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};
