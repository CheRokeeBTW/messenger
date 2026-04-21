"use client";
import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessages } from "../services/messages.services";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../services/socket";
import { RootState } from "../redux/store";
import { incrementUnread, clearUnread } from "../redux/slices/chatSlice";

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

type ChatWindowProps = {
    selectedChat: Conversation | null;
}

type Message = {
  id: string;
  content: string;
  sender_id: string;
};

type TypingUser = {
    id: string;
    username: string;
};

type Notification = {
    conversationId: string;
    message: string;
    sender: string;
}

export default function ChatWindow( {selectedChat} : ChatWindowProps) {
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const user = useSelector((state: any) => state.auth.user); //remove any
    const logout = useSelector((state:any) => state.auth.logout);
    const dispatch = useDispatch();
    const selectedChatRef = useRef(selectedChat);
    const otherUser = selectedChat?.participants.find(
        (u) => u.id !== user.id  
    );
    const otherUserId = otherUser?.id;
    const messageNotifications = useSelector((state: RootState) => state.chat.unreadMessages);

    console.log(otherUserId, "other user");

        useEffect(() => {
            selectedChatRef.current = selectedChat;
        }, [selectedChat]);

        useEffect(() => {
            if (!selectedChat) return;

            socket.emit("join_conversation", selectedChat?.id);
             if (selectedChat?.id){ 
                dispatch(clearUnread(selectedChat?.id));
            }
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
            const handleNotification = (conversationId: string, message: string, sender: string) => {
                if (selectedChatRef.current?.id !== conversationId){
                    dispatch(incrementUnread(conversationId));
                };
            };
            socket.on("message_notification", (handleNotification))
            return () => {
                socket.off("message_notification", handleNotification);
            }
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
                if (!selectedChat?.id) return;
                const newMessage = await sendMessages(selectedChat?.id, message);

                socket.emit("send_message", {
                    conversationId: selectedChat?.id,
                    message: newMessage,
                    sender: user.id,
                });

                setMessage("");
            } catch (err){
                console.error(err);
            }
        };

        //kinda need to add typing effect for users
        useEffect(() => {
            const handleUserTyping = (data: TypingUser) => {
                if (user.id === data.id) return;
                setTypingUsers((prev) => {
                if (prev.find(u => u.id === data.id)) return prev;
                return [...prev, data];
            });
            };

           const handleUserStopTyping = (userId: string) => {
                setTypingUsers((prev) => prev.filter((u) => u.id !== userId));
            };

            socket.on("user_typing", handleUserTyping);
            socket.on("user_stop_typing", handleUserStopTyping);

            return () => {
                socket.off("user_typing", handleUserTyping);
                socket.off("user_stop_typing", handleUserStopTyping);
            };
        }, [])

        const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(e.target.value)

            if (!selectedChat?.id) return;

            if (!isTyping) {
                setIsTyping(true);
                socket.emit('typing', selectedChat.id);
            }

            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }

            timerRef.current = setTimeout(() => {
                setIsTyping(false);
                socket.emit('stop_typing', selectedChat.id);
            }, 2000);
        }

        console.log(selectedChat, 'selectedChat')

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
                            {otherUser?.username || "unknown"}
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
                        {typingUsers.length > 0 && (
                        <div className="text-sm text-gray-400 px-2">
                            {typingUsers.map(u => u.username).join(", ")} is typing...
                        </div>
                        )}
                        <div className="h-12 bg-gray-800 flex items-center px-2">
                            <input
                            type="text"
                            placeholder="Write a message"
                            value={message}
                            onChange={handleTyping}
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