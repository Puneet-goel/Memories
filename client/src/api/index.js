import axios from 'axios';

const url = 'https://memories-backend-mern.herokuapp.com/posts';
const authUrl = 'https://memories-backend-mern.herokuapp.com/auth';
const userUrl = 'https://memories-backend-mern.herokuapp.com/user';
// const authUrl = 'http://localhost:5000/auth';
// const url = 'http://localhost:5000/posts';

export const fetchPosts = (token) =>
  axios.get(`${url}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createPost = (newPost, token) =>
  axios.post(`${url}/`, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePost = (id, updatedPost, token) =>
  axios.patch(`${url}/${id}/`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = (id, token) =>
  axios.delete(`${url}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const likePost = (id, token) =>
  axios.patch(
    `${url}/${id}/likePost/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const fetchUserPosts = (id, token) =>
  axios.get(`${url}/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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


export const loginUser = (user) => axios.post(authUrl + '/login/', user);
export const signupUser = (user) => axios.post(authUrl + '/signup/', user);
export const resetPasswordUser = (user) =>
  axios.post(authUrl + '/reset-password/', user);

export const forgotPasswordUser = (email) =>
  axios.post(authUrl + '/forgot/', { email: email });


export const getUser = (token) => axios.get(userUrl + '/user/', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllUsers = (token) => axios.get(userUrl + '/allUsers/', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const updateFollowUser = (userToBeFollowed, token) => axios.post(userUrl + '/follow/', userToBeFollowed, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});