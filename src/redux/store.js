import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import messageReducer from "./reducer/messageReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
