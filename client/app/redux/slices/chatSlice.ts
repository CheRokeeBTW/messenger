import { createSlice } from "@reduxjs/toolkit";

type UnreadMessages = Record<string, number>;

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    unreadMessages: <UnreadMessages> {},
  },
  reducers: {
    incrementUnread: (state, action) => {
        const id = action.payload;
        if (state.unreadMessages[id] === undefined) {
            state.unreadMessages[id] = 0;
        }
        state.unreadMessages[id] += 1;
    },
    setUnread: (state, action) => {
      state.unreadMessages = action.payload; 
    },
    clearUnread: (state, action) => {
        const id = action.payload;
        state.unreadMessages[id] = 0;
    },
  },
});

export const { incrementUnread, clearUnread, setUnread } = chatSlice.actions;
export default chatSlice.reducer;