"use client";
import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessages } from "../services/messages.services";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../services/socket";
import { RootState } from "../redux/store";
import { incrementUnread, clearUnread, setLastMessage } from "../redux/slices/chatSlice";
import Image from "next/image";
import sendImg from "../../public/Send_icon.svg.png";
import Stickers from "./Stickers";

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

type ChatWindowProps = {
    selectedChat: Conversation | null;
}

type Message = {
  id: string;
  type: "text" | "sticker";
  content: string;
  sender_id: string;
  created_at: string;
  read_by: string[];
};

type TypingUser = {
    conversationId: string;
    id: string;
    username: string;
};

export default function ChatWindow( {selectedChat} : ChatWindowProps) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const user = useSelector((state: any) => state.auth.user); //remove any
    const logout = useSelector((state:any) => state.auth.logout);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const onlineUsers = useSelector((state: RootState) => state.online.users);
    // const chats = useSelector((state: RootState) => state.chat.chats)
    const dispatch = useDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const selectedChatRef = useRef(selectedChat);
    const otherUser = selectedChat?.participants.find(
        (u) => u.id !== user.id  
    );
    const [isStickerOpen, setIsStickerOpen] = useState<boolean>(false);
    const [sticker, setSticker] = useState([]);
    const [search, setSearch] = useState("");

    console.log("SOCKET ID", socket.id);
    const otherUserId = otherUser?.id;
    const messageNotifications = useSelector((state: RootState) => state.chat.unreadMessages);

    useEffect(() => {
        selectedChatRef.current = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        if (!selectedChat?.id) return;

        console.log("JOINING ROOM", selectedChat.id);

        socket.emit("join_conversation", selectedChat.id);
    }, [selectedChat]);

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

    console.log(otherUserId, "other user");

    const isNearBottom = (el: any) => {
        return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    };

        useEffect(() => {
            if (!selectedChat) return;
            scrollToBottom();
            const load = async () => {
                const res = await getMessages(selectedChat.id);

                setMessages(res.slice().reverse());

                const last = res[res.length - 1];
                setCursor(last?.created_at);

                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView();
                }, 0);
            };

            load();
}, [selectedChat]);

const shouldAutoScrollRef = useRef(true);

        useEffect(() => {
        socket.on("receive_message", ({ conversationId, message }) => {
            if (selectedChatRef.current?.id !== conversationId) return

            const container = messagesEndRef.current?.parentElement;
                    shouldAutoScrollRef.current =
            container ? isNearBottom(container) : false;

            setMessages(prev => [...prev, message]);

        });

            return () => {
                socket.off("receive_message");
            };
        }, []);

        useEffect(() => {
    if (shouldAutoScrollRef.current) {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }
}, [messages]);

        useEffect(() => {
            const handleNotification = ({
            conversationId,
            message,
            sender,
            }: {
            conversationId: string;
            message: Message;
            sender: string;
            }) => {
            if (selectedChatRef.current?.id !== conversationId) {
                dispatch(incrementUnread(conversationId));
            }

            dispatch(
                setLastMessage({
                conversationId,
                message,
                })
            );
            };
            socket.on("message_notification", (handleNotification))
            return () => {
                socket.off("message_notification", handleNotification);
            }
        }, []);

        useEffect(() => {
            if(!selectedChat) return
            scrollToBottom();
            
            const getChats = async () => {
                const res = await getMessages(selectedChat.id);
                
                setMessages(res.slice().reverse());
                
                const last = res[res.length - 1];
                setCursor(last?.created_at);
                
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView();
                }, 0);
            };
            
            getChats();
        }, [selectedChat]);

        useEffect(() => {
            if (!selectedChat?.id) return;
            socket.emit("mark_read", {conversationId: selectedChat?.id});
            dispatch(clearUnread(selectedChat.id));
        }, [selectedChat])
        console.log(messageNotifications, "TEST");

        const toggleStickers = () =>{
            setIsStickerOpen((s) => !s)
        }

        useEffect(() => {
            const handleMessagesRead = ({ conversationId, userId } : {conversationId: string | number | undefined, userId: string}) => {
                if (selectedChatRef.current?.id !== conversationId) return;

                // setMessages(prev =>
                //     prev.map(msg => {
                //         if (!msg.read_by?.includes(AuserId)) {
                //             return {
                //                 ...msg,
                //                 read_by: [...(msg.read_by || []), userId],
                //             };
                //         }
                //         return msg;
                //     })
                // );
            };

            socket.on("messages_read", handleMessagesRead);

            return () => {
                socket.off("messages_read", handleMessagesRead);
            };
        }, []);

        const handleSendMessage = async () => {
            if (!message.trim()) return;
            try{
                if (!selectedChat?.id) return;
                const newMessage = await sendMessages(selectedChat?.id, message);
                
                dispatch(setLastMessage({
                    conversationId: selectedChat.id,
                    message: newMessage,
                }));

                socket.emit("send_message", {
                    conversationId: selectedChat?.id,
                    message: newMessage,
                    sender: user.id,
                });

                // setMessages(prev => [...prev, newMessage]);

                setMessage("");

                const container = messagesEndRef.current?.parentElement;
                const shouldScroll = container && isNearBottom(container);

                    if (shouldScroll) {
                        setTimeout(() => {
                            messagesEndRef.current?.scrollIntoView();
                        }, 0);
                    }
            } catch (err){
                console.error(err);
            }
        };

        const handleSendSticker = async (url: string) => {
            try{
                if (!selectedChat?.id) return;
                const newMessage = await sendMessages(
                    selectedChat?.id,
                    url,
                    "sticker"
                );
                
                dispatch(setLastMessage({
                    conversationId: selectedChat.id,
                    message: newMessage,
                }));

                socket.emit("send_message", {
                    conversationId: selectedChat?.id,
                    message: newMessage,
                    sender: user.id,
                });

                // setMessages(prev => [...prev, newMessage]);

                setIsStickerOpen(false);
                setMessage("");

                const container = messagesEndRef.current?.parentElement;
                const shouldScroll = container && isNearBottom(container);

                    if (shouldScroll) {
                        setTimeout(() => {
                            messagesEndRef.current?.scrollIntoView();
                        }, 0);
                    }
            } catch (err){
                console.error(err);
            }
        };

        useEffect(() => {
    setTypingUsers([]);
}, [selectedChat?.id]);

        //kinda need to add typing effect for users
        useEffect(() => {
            const handleUserTyping = (data: TypingUser) => {
                console.log("TYPING DATA", data);
                if (selectedChatRef.current?.id !== data.conversationId) {
                    return;
                }
                if (user.id === data.id) return;
                setTypingUsers((prev) => {
                if (prev.find(u => u.id === data.id)) return prev;
                return [...prev, data];
            });
            };

           const handleUserStopTyping = ({conversationId, userId} : {conversationId: string, userId: string}) => {
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

            if (!selectedChatRef.current?.id) return;

            if (!isTyping) {
                setIsTyping(true);
                socket.emit('typing', selectedChatRef.current?.id);
            }

            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }

            timerRef.current = setTimeout(() => {
                setIsTyping(false);
                socket.emit('stop_typing', selectedChatRef.current?.id);
            }, 2000);
        }

        console.log(selectedChat, 'selectedChat');

        const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
                const el = e.currentTarget;

                if (el.scrollTop > 50) return;

                if (!cursor || isFetching) return;

                setIsFetching(true);

                const prevHeight = el.scrollHeight;

                const res: Message[] = await getMessages(selectedChat!.id, cursor);

                if (res.length === 0) {
                    setCursor(null);
                    setIsFetching(false);
                    return;
                }

                setMessages(prev => {
                    const existing = new Set(prev.map(m => m.id));
                    const newMsgs = res.filter(m => !existing.has(m.id));
                    return [...newMsgs.reverse(), ...prev];
                });

                setCursor(res[res.length - 1].created_at);

                requestAnimationFrame(() => {
                    el.scrollTop = el.scrollHeight - prevHeight;
                    setIsFetching(false);
                });
            };

            const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;

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
                        <div className="w-full h-12 bg-white items-center justify-center flex text-black gap-1">
                            {otherUser?.username || "unknown"}
                                <span className={isOnline ? "text-green-500" : "text-gray-400"}>
                                ●
                                </span>
                        </div>
                        <div onScroll={handleScroll} className="flex flex-col flex-1 overflow-y-auto bg-gray-200">
                          {messages.length === 0 ? (
                            <span>Start messaging</span>
                            ) : (
                            messages.map((m) => (
                                <div key={m.id}
                                className={`flex p-2 ${m.sender_id === user.id 
                                    ? "justify-end" 
                                    : "justify-start"
                                }`}
                                >
                                <div
                                 className={`overflow-x-hidden max-w-[500px] ${m.sender_id === user.id 
                                    ? "bg-white mb-3 max-w-[50%] px-3 py-2 rounded-lg text-black" 
                                    : "bg-blue-500 mb-3 max-w-[50%] px-3 py-2 rounded-lg"
                                }`}>
                                <span className="break-words">
                                {m.type === "sticker" ? (
                                <img
                                    src={m.content}
                                    alt="sticker"
                                    className="max-w-[180px] rounded-lg"
                                />
                                ) : (
                                <span>{m.content}</span>
                                )}
                                 {m.sender_id === user.id && (
                                    <span className="ml-1 text-xs">
                                    {otherUserId && m.read_by?.includes(otherUserId) ? "✓✓" : "✓"}
                                    </span>
                                )}
                                </span>
                                </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                        </div>
                        {typingUsers.length > 0 && (
                        <div className="text-sm text-black px-2 bg-gray-200">
                            {typingUsers.map(u => u.username).join(", ")} is typing...
                        </div>
                        )}
                        <div className="h-12 bg-white flex items-center px-2 text-black">
                            <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onKeyDown={async (e) => {
                                if (e.key !== 'Enter') return;
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            onChange={handleTyping}
                            className="w-full focus:outline-none placeholder:text-zinc-500"
                            />
                        {isStickerOpen && (
                        <div className="absolute bottom-13 right-6 w-[520px] h-[500px] bg-white shadow-lg rounded-lg overflow-y-auto z-50 no-scrollbar">
                            <Stickers onSelectSticker={handleSendSticker} />
                        </div>
                        )}
                            <span
                            onClick={toggleStickers}
                            >Stickers</span>
                            <Image
                            onClick={handleSendMessage}
                            alt = "sendMsg"
                            src = {sendImg}
                            className="w-[1.3rem] h-[1.3rem] hover:cursor-pointer"
                             />
                        </div>
                    </div>
                )
                }
        </div>
    )
}