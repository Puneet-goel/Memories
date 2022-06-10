import axios from 'axios';

// const URL = 'https://memories-backend-mern.herokuapp.com';
const URL = 'http://localhost:5000';

const postUrl = URL + '/posts';
const authUrl = URL + '/auth';
const userUrl = URL + '/user';

export const fetchPosts = (token) =>
  axios.get(`${postUrl}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createPost = (newPost, token) =>
  axios.post(`${postUrl}/`, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePost = (id, updatedPost, token) =>
  axios.patch(`${postUrl}/${id}/`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = (id, token) =>
  axios.delete(`${postUrl}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const likePost = (id, token) =>
  axios.patch(
    `${postUrl}/${id}/likePost/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const loginUser = (user) => axios.post(authUrl + '/login/', user);

export const signupUser = (user) => axios.post(authUrl + '/signup/', user);

export const resetPasswordUser = (user) =>
  axios.post(authUrl + '/reset-password/', user);

export const forgotPasswordUser = (email) =>
  axios.post(authUrl + '/forgot/', { email: email });

export const authenticate = (token) =>
  axios.post(
    authUrl + '/authenticate/',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const getAllUsers = (token) =>
  axios.get(userUrl + '/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const followUser = (data, token) =>
  axios.patch(userUrl + '/followUser/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
