import { LOGIN, SIGNUP, FORGOTPASSWORD, RESETPASSWORD, AUTHORIZE } from "../constants/actionTypes";
import * as api from "../api";
import { findToken } from "./posts";

export const login = (email, password, username, check) => async(dispatch) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await api.loginUser(user);

        if(data.message==="ok"){

            //create a token cookie
            const d = new Date();
            var days = 1;
            if(check){
                days = 30;
            }

            d.setTime(d.getTime() + (days*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = `token=${data.token}; ${expires}; path=/;`;

            localStorage.setItem('username',username);
            localStorage.setItem('email',email);

            dispatch({
                type: LOGIN,
                payload: {
                    email: email,
                    username: username
                },
            });

        }
        
        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const register = (email, password, username) => async(dispatch) => {

    try{
        const user = {
            email: email,
            password: password,
            username: username
        };
        
        const {data} = await api.signupUser(user);

        dispatch({
		    type: SIGNUP,
		    payload: data,
	    });

        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const forgotPassword = (email) => async(dispatch) => {

    try{
        const {data} = await api.forgotPasswordUser(email);

        dispatch({
		    type: FORGOTPASSWORD,
		    payload: data,
	    });

        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const resetPassword = (id, username, password) => async(dispatch) => {
    try{

        const user = {
            id: id,
            password: password,
            username: username
        };

        const {data} = await api.resetPasswordUser(user);

        dispatch({
		    type: RESETPASSWORD,
		    payload: data,
	    });

        return data.message;

    }catch(err){
        console.log(err);
    }
}

export const authenticate = () => async(dispatch) => {

	try{

		const token = findToken();
		if(token === null){
			return false;
		}

		const {data} = await api.authenticate(token);

        localStorage.setItem('username',data.username);
        localStorage.setItem('email',data.email);

		dispatch({
			type: AUTHORIZE,
			payload: data,
		});

		return true;
	}catch(error){
		console.log(error);
		return false;
	}
}