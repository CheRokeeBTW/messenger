import { createSlice } from "@reduxjs/toolkit";

type UnreadMessages = Record<string, number>;

type Participant = {
  id: string;
  username: string;
}

type Conversation = {
  id: string;
  is_group: boolean;
  created_at: string;
  participants: Participant[];
  last_message: string;
  last_message_time: string;
  last_sender_id: string;
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  read_by: string[];
};

type MessagesState = Record<string, Message[]>;

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    unreadMessages: <UnreadMessages> {},
    chats: [] as Conversation[],
    // messages: {} as MessagesState,
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
    setLastMessage: (state, action) => {
      const {conversationId, message} = action.payload;

      const chat = state.chats.find(c => c.id === conversationId);

       if (chat) {
        chat.last_message = message.content;
        chat.last_message_time = new Date().toISOString();
        chat.last_sender_id = message.sender_id;
      }
    },
     setChats: (state, action) => {
      state.chats = action.payload; 
    },
    clearUnread: (state, action) => {
        const id = action.payload;
        state.unreadMessages[id] = 0;
    },
    // markMessagesRead: (state, action) => {
    //   const { conversationId, userId } = action.payload;

    //   const messages = state.messages[conversationId];
    //   if (!messages) return;

    //   for (const msg of messages) {
    //     if (!msg.read_by.includes(userId)) {
    //       msg.read_by.push(userId);
    //     }
    //   }
    // },
    // setMessages: (state, action) => {
    //   const { conversationId, messages } = action.payload;
    //   state.messages[conversationId] = messages;
    // }
  },
});

export const { incrementUnread, clearUnread, setUnread, setLastMessage, setChats } = chatSlice.actions;
export default chatSlice.reducer;