import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  id: "",
  login: "",
  password: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { name, token, id, password, login } = action.payload;
      state.name = name;
      state.token = token;
      state.id = id;
      state.password = password;
      state.login = login;
    },
    logout: (state) => {
      state.name = "";
      state.token = "";
      state.id = "";
      state.password = "";
      state.login = "";
    }
  },
});

export default authSlice.reducer;
export const { setCredentials, logout, setId } = authSlice.actions;
