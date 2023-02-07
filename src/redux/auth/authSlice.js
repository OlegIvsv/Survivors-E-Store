import { createSlice } from "@reduxjs/toolkit";

/** 
 * Init state for testsing! 
 * Should be replaced with emopty one when authentication page is created!
*/
const initialState = { 
    name: "User_1", 
    id: "501f738f-3d4b-4787-a755-0073cf88d235",
    login: 'login',
    password: 'password',
    token: "1234567890qwerty"
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const { name, token, id, password, login } = action.payload;
            state.name = name;
            state.token = token;
            state.id = id;
            state.password = password;
            state.login = login;
        },
        logout: (state) => {
            state.name = '';
            state.token = '';
            state.id = '';
            state.password = '';
            state.login = '';
        }
    }
});

export default authSlice.reducer;
export const {setCredentials, logout} = authSlice.actions;

export const authStateSelector = (state)  => state.auth;
export const authUserIdSelector = (state)  => state.auth.id; 