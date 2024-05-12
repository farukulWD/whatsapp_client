import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  newUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setNewUser: (state, action) => {
      state.newUser = action.payload;
    },
  },
});

export const { setUserInfo, setNewUser } = userSlice.actions;

export default userSlice.reducer;
