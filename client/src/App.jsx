import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import Home from "./components/Home/Home.jsx";
import ViewPost from "./components/ViewPost/ViewPost.jsx";
import { authenticate } from "./actions/auth";

const App = () => {
    
    const [isUserValid, setUserValid] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const x = await dispatch(authenticate());
            setUserValid(x);
        })()
    },[dispatch]);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ isUserValid?<Home setUserValid={setUserValid} />: <Navigate to="/login" /> } />
                <Route path="/login" element={ isUserValid?<Navigate to="/" />: <Login setUserValid={setUserValid} /> } />
                <Route path="/signup" element={ isUserValid?<Navigate to="/" />: <Signup /> } />
                <Route path="/forgot-password" element={ <ForgotPassword /> } />
                <Route path="/reset-password/:id/:username" element={ <ResetPassword /> } />
                <Route path="/viewPost/:id" element={ <ViewPost isUserValid={isUserValid} /> } />
                <Route path="/*" element={ <Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
