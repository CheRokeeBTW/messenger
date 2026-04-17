"use client";
import { useState, useEffect } from "react";
import { getMessages, sendMessages } from "../services/messages.services";
import { useSelector } from "react-redux";
import { socket } from "../services/socket";

type Conversation = {
  id: string;
  title: string | null;
  is_group: boolean;
  created_at: string;
};

type ChatWindowProps = {
    selectedChat: Conversation | null;
}

type Message = {
  id: string;
  content: string;
  sender_id: string;
};

export default function ChatWindow( {selectedChat} : ChatWindowProps) {
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<Message[]>([]);
    const user = useSelector((state: any) => state.auth.user);

        useEffect(() => {
            if (!selectedChat) return;

            socket.emit("join_conversation", selectedChat.id);

        }, [selectedChat]);

        useEffect(() => {
            socket.on("receive_message", (message) => {
                setChats((prev) => [...prev, message]);
            });

            return () => {
                socket.off("receive_message");
            };
        }, []);

        useEffect(() => {
            if(!selectedChat) return
            const getChats = async () => {
                try{
                    const res = await getMessages(selectedChat?.id);
                    setChats(Array.isArray(res) ? res : []);
                    console.log("messages response:", res);
                }
                catch (err){
                    console.error(err)
                }
            };
    
            getChats();
        }, [selectedChat]);

        const handleSendMessage = async () => {
            if (!message.trim()) return;
            try{
                const newMessage = await sendMessages(selectedChat?.id, message);
                // setChats((prev) => [...prev, newMessage]);

                socket.emit("send_message", {
                    conversationId: selectedChat?.id,
                    message: newMessage,
                });

                setMessage("");
            } catch (err){
                console.error(err);
            }
        }

        console.log(chats)

    return(
        <div className="flex w-full h-full">
                {!selectedChat
                ? (
                    <div className="flex bg-zinc-600 w-full h-full justify-center items-center">
                        Start a conversation
                    </div>
                )
                : (
                    <div className="flex flex-col w-full">
                        <div className="w-full h-12 bg-zinc-700 items-center justify-center flex">
                            {selectedChat.title}
                        </div>
                        <div className="flex flex-col flex-1 overflow-y-auto">
                          {chats.length === 0 ? (
                            <span>Start messaging</span>
                            ) : (
                            chats.map((m) => (
                                <div key={m.id}
                                className={` flex ${m.sender_id === user.id 
                                    ? "justify-end" 
                                    : "justify-start"
                                }`}
                                >
                                <div
                                 className={`${m.sender_id === user.id 
                                    ? "bg-green-600 mb-2 max-w-[50%] px-3 py-2 rounded-lg" 
                                    : "bg-gray-600 mb-2 max-w-[50%] px-3 py-2 rounded-lg"
                                }`}>
                                {m.content}
                                </div>
                                </div>
                            ))
                            )}
                        </div>
                        <div className="h-12 bg-gray-800 flex items-center px-2">
                            <input
                            type="text"
                            placeholder="Write a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full"
                            />
                            <button
                            onClick={handleSendMessage}
                            >
                                send
                            </button>
                        </div>
                    </div>
                )
                }
        </div>
    )
}