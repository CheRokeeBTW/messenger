"use client";

import { useEffect, useState, useRef } from "react";
import { getConversations, getUsers, createConversation } from "../services/chat.services";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUnread, setChats } from "../redux/slices/chatSlice";
import formatTime from "../helpers/formatTime";

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

type User = {
    email: string;
    id: string;
    username: string
};

type SidebarProps = {
  onSelectConversation: (conversation: Conversation) => void;
};

export default function Sidebar( {onSelectConversation}: SidebarProps ) {
    const chats = useSelector((state: RootState) => state.chat.chats)
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const messageNotifications = useSelector((state: RootState) => state.chat.unreadMessages);
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();
    const today: number = Number(new Date().toISOString().slice(8,10).replaceAll("-",""));
    let days: number;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [, setTick] = useState(0);

    timerRef.current = setTimeout(() => {timerRef.current}, 3000);

    console.log(messageNotifications, "message Notifications final");

    //need that to update last msg time every 60secs
    useEffect(() => {
      const interval = setInterval(() => {
        setTick(t => t + 1);
      }, 60000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try{
                const res = await getConversations();
                dispatch(setChats(res));
                const newObject: any = {};
                for(let r of res){
                  newObject[r.id] = Number(r.unread_count)
                };
                console.log('CONVERSATIONS:', res);
                dispatch(setUnread(newObject));
            }
            catch (err){
                console.error(err)
            }
        };

        getChats();
    }, []);

                // useEffect(() => { //REMOVE TOMORROW
                //    for(let chat of chats){
                //   days = today - Number(chat.last_message_time.slice(8,10).replaceAll("-",""))
                //   console.log(days, "DAYS")
                // }
                // }, [timerRef.current])

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

            dispatch(setChats(res));
            onSelectConversation(newConversation);

            setSearch("");
            setUsers([]);
        } catch (err){
            console.error(err);
        }
    };

  return (
    <div className="w-96 bg-white h-full flex flex-col">
      <div className="p-2">
        <input
          placeholder="Search..."
          className="w-full p-2 rounded bg-white placeholder-gray-500 border-none "
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
        className="p-2 hover:bg-gray-200 cursor-pointer text-black"
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
       className="p-2 text-black hover:cursor-pointer hover:bg-gray-200"
       onClick={() => onSelectConversation(chat)}
       >
        <div>
        { otherUser?.username || "unknown"} : {messageNotifications[chat.id] || 0}
        <span>{chat.last_message_time ? formatTime(chat.last_message_time) : ""}</span>
        </div>
        <p className="text-[0.75rem]">{chat?.last_message}</p>
      </div>
    )})
  )}
</div>
    </div>
  );
}