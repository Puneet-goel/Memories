import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import Home from './components/Home/Home.jsx';
import ViewPost from './components/ViewPost/ViewPost.jsx';
import LinearLoading from './components/LinearLoading/LinearLoading.jsx';

const App = () => {
  const isUserValid = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUserValid ? <Home /> : <LinearLoading />} />
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
          path="/reset-password/:id/:username"
          element={<ResetPassword />}
        />
        <Route path="/viewPost/:id" element={<ViewPost />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
