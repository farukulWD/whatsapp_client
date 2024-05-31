const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  messages: [],
  socket: undefined,
  searchMessage: false,
};

const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    addMessages: (state, action) => {
      const newMessage = action.payload;

      const messageExists = state.messages.some(
        (message) => message.id === newMessage.id
      );

      if (!messageExists) {
        state.messages = [...state.messages, newMessage];
      } else {
        console.log("Duplicate message ID detected, skipping add.");
      }
    },
    setSearchMessage: (state) => {
      state.searchMessage = !state.searchMessage;
    },
  },
});

export const { setMessages, setSocket, addMessages, setSearchMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
