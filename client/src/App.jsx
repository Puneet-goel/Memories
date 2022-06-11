import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { getAllUsers } from './actions/user';

import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import Home from './components/Home/Home.jsx';
import ViewPost from './components/ViewPost/ViewPost.jsx';
import AuthenticationLoading from './components/AuthenticationLoading/AuthenticationLoading.jsx';
import UserBox from './components/UserBox/UserBox.jsx';
import Profile from './components/Profile/Profile.jsx';

const App = () => {
  const isUserValid = useSelector((state) => state.profile);
  const [isEverythingFetched, setIsEverythingFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserValid && !isEverythingFetched) {
      setIsEverythingFetched(true);
      dispatch(getPosts());
      dispatch(getAllUsers());
    }
  }, [dispatch, isUserValid, isEverythingFetched]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserValid ? <Home /> : <AuthenticationLoading failure="/login" />
          }
        />
        <Route
          path="/login"
          element={isUserValid ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isUserValid ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/connect"
          element={
            isUserValid ? <UserBox /> : <AuthenticationLoading failure="/" />
          }
        />
        <Route
          path="/profile/:username"
          element={
            isUserValid ? <Profile /> : <AuthenticationLoading failure="/" />
          }
        />
        <Route
          path="/post/:id"
          element={
            isUserValid ? (
              <ViewPost />
            ) : (
              <AuthenticationLoading failure="/login" />
            )
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
