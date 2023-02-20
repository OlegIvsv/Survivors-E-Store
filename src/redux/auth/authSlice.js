import { createSlice } from "@reduxjs/toolkit";

/** 
 * Init state for testsing! 
 * Should be replaced with emopty one when authentication page is created!
*/
const initialState = { 
    name: "User_1", 
    id: "",
    login: 'login',
    password: 'password',
    token: ""
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
        setId: (state, action) => {
            state.id = action.payload.id;
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
export const { setCredentials, logout, setId } = authSlice.actions;

export const authStateSelector = (state)  => state.auth;
export const authUserIdSelector = (state)  => state.auth.id; 