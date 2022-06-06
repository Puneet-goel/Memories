import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../constants/actionTypes';
import * as api from '../api';

//Action Creators

export const findToken = () => {
  var token = decodeURIComponent(document.cookie);
  if (!token || token.length < 6) {
    return null;
  }

  token = token.substring(6);
  return token;
};

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

export const createPost = (post) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("selectedFile", post.selectedFile);
    formData.append("message", post.message);
    formData.append("tags", post.tags);
    formData.append("createdAt", new Date());

    const { data } = await api.createPost(formData, token);
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const token = findToken();
    if (token === null) {
      return;
    }

    await api.updatePost(id, post, token);
    dispatch({
      type: UPDATE,
      payload: post,
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
