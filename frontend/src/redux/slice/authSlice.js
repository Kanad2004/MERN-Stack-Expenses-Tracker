import { createSlice } from "@reduxjs/toolkit";

//!Initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },

  //?1.Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },

    logoutAction: (state , action) => {
      state.user = null;
    },
  },
});


//!Generate the actions
export const {loginAction , logoutAction} = authSlice.actions;

//!Generate the reducers
const authReducer = authSlice.reducer;

export default authReducer;
