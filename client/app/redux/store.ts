import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import onlineReducer from './slices/onlineSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    online: onlineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;