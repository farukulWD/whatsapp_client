import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  userContacts: [],
  onlineUsers: [],
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
    setContactPage: (state) => {
      state.contactsPage = !state.contactsPage;
    },
    setCurrentChatUser: (state, action) => {
      state.currentChatUser = action.payload;
    },
    setUserContacts: (state, action) => {
      state.userContacts = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setChangeCurrentChatUser: (state, action) => {
      state.currentChatUser = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setNewUser,
  setContactPage,
  setCurrentChatUser,
  setUserContacts,
  setOnlineUsers,
  setChangeCurrentChatUser,
} = userSlice.actions;

export default userSlice.reducer;
