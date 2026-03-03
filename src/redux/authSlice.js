import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, //store user data
  isAuthenticated: false, //check if user is logged in
};

const authSlice = createSlice({
  name: "auth",  
  initialState,
  reducers: {
    signup: (state, action) => {
      state.user = action.payload;//action.payload = form data
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;