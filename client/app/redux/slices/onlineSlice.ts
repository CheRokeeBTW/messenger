import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
  name: "online",
  initialState: {
    users: [] as string[],
  },
  reducers: {
    setOnlineUsers(state, action: PayloadAction<string[]>) {
      state.users = action.payload;
    },
  },
});

export const { setOnlineUsers } = onlineSlice.actions;
export default onlineSlice.reducer;