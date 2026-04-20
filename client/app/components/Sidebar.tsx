"use client";

import { useEffect, useState } from "react";
import { getConversations, getUsers, createConversation } from "../services/chat.services";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUnread } from "../redux/slices/chatSlice";

type Participant = {
  id: string;
  username: string;
}

type Conversation = {
  id: string;
  is_group: boolean;
  created_at: string;
  participants: Participant[];
};

type User = {
    email: string;
    id: string;
    username: string
};

type SidebarProps = {
  onSelectConversation: (conversation: Conversation) => void;
};

export default function Sidebar( {onSelectConversation}: SidebarProps ) {
    const [chats, setChats] = useState<Conversation[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const messageNotifications = useSelector((state: RootState) => state.chat.unreadMessages);
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();

    console.log(messageNotifications, "message Notifications final")

    useEffect(() => {
        const getChats = async () => {
            try{
                const res = await getConversations();
                setChats(res);
                const newObject: any = {};
                for(let r of res){
                  newObject[r.id] = Number(r.unread_count)
                }
                dispatch(setUnread(newObject));
            }
            catch (err){
                console.error(err)
            }
        };

        getChats();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (search.length < 2) {
            setUsers([]);
            return;
            }

            try {
            const data = await getUsers(search);
            setUsers(data);
            } catch (err) {
            console.error(err);
            }
        };

        fetchUsers();
}, [search]);

console.log('chats are', chats);

const handleSelectUser = async (user: User) => {
    try{
        const newConversation = await createConversation([user.id]);
        const res = await getConversations();

        setChats(res);
        onSelectConversation(newConversation);

        setSearch("");
        setUsers([]);
    } catch (err){
        console.error(err);
    }
};

  return (
    <div className="w-72 bg-zinc-900 h-full flex flex-col">
      <div className="p-2">
        <input
          placeholder="Search..."
          className="w-full p-2 rounded bg-zinc-800"
          value = {search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
  {search.length > 1 ? (
    users.map((user) => (
      <div
        key={user.id}
        onClick={() => handleSelectUser(user)}
        className="p-2 hover:bg-zinc-800 cursor-pointer"
      >
        <Highlighter
            highlightClassName="bg-yellow-400 text-black"
            searchWords={[search]}
            autoEscape={true}
            textToHighlight={user.username}
        />
      </div>
    ))
  ) : (
    chats.map((chat) => {
      const otherUser = chat.participants?.find(
    (u) => u.id !== user.id
  );
      return (
      <div key={chat.id}
       className="p-2"
       onClick={() => onSelectConversation(chat)}
       >
        { otherUser?.username || "unknown"} : {messageNotifications[chat.id] || 0}
      </div>
    )})
  )}
</div>
    </div>
  );
}