"use client";


import { useEffect, useState } from "react";
import { getConversations, getUsers, createConversation } from "../services/chat.services";

type Conversation = {
  id: string;
  title: string | null;
  is_group: boolean;
  created_at: string;
};

type User = {
    email: string;
    id: string;
    username: string
}

export default function Sidebar() {
    const [chats, setChats] = useState<Conversation[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() =>{
        const getChats = async () => {
            try{
                const res = await getConversations();
                setChats(res);
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

const handleSelectUser = async (user: User) => {
    try{
        await createConversation(user.id, user.username);

        const updated = await getConversations();
        setChats(updated);

        setSearch("");
        setUsers([]);
    } catch (err){
        console.error(err);
    }
}

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
        {user.username}
      </div>
    ))
  ) : (
    chats.map((chat) => (
      <div key={chat.id} className="p-2">
        {chat.title || "chat title"}
      </div>
    ))
  )}
</div>
    </div>
  );
}