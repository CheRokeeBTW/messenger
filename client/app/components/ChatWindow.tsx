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
import stickerImg from "../../public/18737600.png";
import logoutImg from "../../public/1286853.png";
import { logout } from "../redux/slices/authSlice";
import { logoutUser } from "../services/auth.services";
import { useRouter } from "next/navigation";
import { uploadImage } from "../services/upload.services";
import { playNotificationSound } from "../services/notification.service";
import ImageViewer from "./ImageViewer";
import { LoaderCircle, Check, X } from "lucide-react";

type Participant = {
  id: string;
  username: string;
};

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
};

type ReplyMessage = {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  type: "text" | "sticker" | "image";
};

type Message = {
  id: string;
  type: "text" | "sticker" | "image";
  content: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
  read_by: string[];
  attachments?: {
    file_url: string;
    file_type: string;
  }[];
  reply_to?: string;
  reply?: ReplyMessage;
};

type TypingUser = {
    conversationId: string;
    id: string;
    username: string;
};

export default function ChatWindow( {selectedChat} : ChatWindowProps) {
    const [replyTo, setReplyTo] = useState<Message | null>(null);
    const [openedImage, setOpenedImage] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const user = useSelector((state: any) => state.auth.user); //remove any
    // const logout = useSelector((state:any) => state.auth.logout);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const onlineUsers = useSelector((state: RootState) => state.online.users);
    // const chats = useSelector((state: RootState) => state.chat.chats)
    const dispatch = useDispatch();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const selectedChatRef = useRef(selectedChat);
    const otherUser = selectedChat?.participants.find(
        (u) => u.id !== user.id  
    );
    const [isStickerOpen, setIsStickerOpen] = useState<boolean>(false);
    const [sticker, setSticker] = useState([]);
    const [search, setSearch] = useState("");
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [date, setDate] = useState<string>("");

const getDate = (time: string) => {
    const timeZone = "Europe/Moscow";

    const messageDate = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(time));

    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(yesterday);

    if (messageDate === today) return "Today";
    if (messageDate === yesterdayDate) return "Yesterday";

    return new Intl.DateTimeFormat("en-US", {
        timeZone,
        month: "long",
        day: "numeric",
    }).format(new Date(time));
};

    console.log("SOCKET ID", socket.id);
    const otherUserId = otherUser?.id;
    const messageNotifications = useSelector((state: RootState) => state.chat.unreadMessages);

    useEffect(() => {
        selectedChatRef.current = selectedChat;
    }, [selectedChat]);

    const getTime = (time: string) => {
        return new Intl.DateTimeFormat("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Moscow",
        }).format(new Date(time));
    };

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
        return el.scrollHeight - el.scrollTop - el.clientHeight < 500;
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
            
            if (document.hidden) {
                playNotificationSound();
            };

            if (selectedChatRef.current?.id !== conversationId) return
            
            socket.emit("mark_read", {
                conversationId,
            });
            
            const container = messagesEndRef.current?.parentElement;
                    shouldAutoScrollRef.current =
            container ? isNearBottom(container) : false;
            

            setMessages(prev => [...prev, message]);
    
            console.log('READ')

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
                playNotificationSound();
            };

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

                console.log('WORKS')

                setMessages(prev =>
                    prev.map(msg => {
                        if (!msg.read_by?.includes(userId)) {
                            return {
                                ...msg,
                                read_by: [...(msg.read_by || []), userId],
                            };
                        }
                        return msg;
                    })
                );
            };

            

            socket.on("messages_read", handleMessagesRead);

            return () => {
                socket.off("messages_read", handleMessagesRead);
            };
        }, []);

        const scrollToBottomIfNeeded = () => {
        const container = messagesEndRef.current?.parentElement;
        const shouldScroll = container && isNearBottom(container);

        if (shouldScroll) {
            requestAnimationFrame(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            });
        }
    };

    const [progress, setProgress] = useState<Record<string, number>>({});

    const reset = () => {
        setProgress({});
    }

        const handleSendMessage = async () => {
    if (!selectedChat?.id) return;

    try {
        console.log("FILES EXIST:", pendingImages);
        if (pendingImages.length > 0) {

            const attachments = pendingImages.map(img => ({
                file_url: img.uploadedUrl!,
                file_type: "image"
            }));

            if(finishedLoading) return;

            const newMessage = await sendMessages({
                conversationId: selectedChat.id,
                content: message,
                type: "image",
                attachments
        });

            dispatch(setLastMessage({
                conversationId: selectedChat.id,
                message: newMessage,
            }));

            socket.emit("send_message", {
                conversationId: selectedChat.id,
                message: newMessage,
                sender: user.id,
            });
        

            setPendingImages([]);
            setMessage("");
            // reset();

            return;
        }

        if (!message.trim()) return;

        const newMessage = await sendMessages({
            conversationId: selectedChat.id,
            content: message,
            type: "text",
            attachments: [],
            replyTo: replyTo?.id,
    })

        dispatch(setLastMessage({
            conversationId: selectedChat.id,
            message: newMessage,
        }));

        socket.emit("send_message", {
            conversationId: selectedChat.id,
            message: newMessage,
            sender: user.id,
        });

        setMessage("");
        setReplyTo(null);

    } catch (err) {
        console.error(err);
    }
     finally {
        reset();
    }
};

useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });
}, [messages]);

        const handleSendSticker = async (url: string) => {
            try{
                if (!selectedChat?.id) return;
                const newMessage = await sendMessages({
                    conversationId: selectedChat?.id,
                    content: url,
                    type: "sticker"
            });
                
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

        const handleLogout = async() =>{
            try{
                await logoutUser();
                dispatch(logout());
                router.push("/auth/login");
            }
            catch (err){
                console.error(err)
            }
        }

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
        };

        type PendingImage = {
            id: string, 
            file: File;
            progress: number;
            uploadedUrl?: string;
            status: "finished" | "uploading" | "failed"
        };

        const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);

        const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
            for(const item of e.clipboardData.items){
                if (item.type.startsWith("image/")){

                    const file = item.getAsFile();
                    if(!file) continue;

                    const pendingImage: PendingImage = {
                        id: crypto.randomUUID(),
                        file,
                        progress: 0,
                        status: "uploading",
                    };

                    setPendingImages((prev) => [
                        ...prev,
                        pendingImage
                    ]);

                    try{
                        const uploaded = await uploadImage(file, progress => {
                            setPendingImages(prev => 
                                prev.map(image =>
                                    image.id === pendingImage.id ? {
                                        ...image,
                                        progress,
                                        } : image
                                    ))});

                        console.log(uploaded, "UPLOADEDFILE")
                                        
                        setPendingImages(prev =>
                            prev.map(image =>
                                image.id === pendingImage.id
                                    ? {
                                        ...image,
                                        progress: 100,
                                        uploadedUrl: uploaded.url,
                                        status: "finished"
                                    }
                                    : image
                            ));
                    } catch {
                        setPendingImages(prev =>
                            prev.map(image =>
                                image.id === pendingImage.id
                                    ? {
                                        ...image,
                                        status: "failed"
                                    }
                                    : image
                            ))}
                        }
                }
            }

        useEffect(() => {
            if (pendingImages.length > 0) {
                requestAnimationFrame(() => {
                    scrollToBottomIfNeeded();
                });
            }
        }, [pendingImages]);

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

            console.log(messages, 'MESSAGES')

            const isOnline = otherUser ? onlineUsers.includes(otherUser.id) : false;

            const isURL = (value: string) => {
                try{
                    if(!value.includes(".")) return false;

                    new URL(
                        value.startsWith("http")
                            ? value
                            : `https://${value}`
                    );
                    return true;
                } catch {
                    return false;
                };
            };

        const finishedLoading = pendingImages.some(image => image.status === "uploading");

    return(
        <div className="flex w-full h-full">
                {!selectedChat
                ? (
                    <div className="flex flex-col w-full">
                        <div className="w-full h-12 bg-white justify-end items-center flex text-black gap-1">
                            <Image
                                alt = "logout"
                                src = {logoutImg}
                                onClick={handleLogout}
                                className="w-[1.3rem] h-[1.3rem] hover:cursor-pointer mr-[10px]"
                                />
                        </div>
                        <div className="flex bg-zinc-900 w-full h-full justify-center items-center">
                            Start a conversation
                        </div>
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
                        <div onScroll={handleScroll} className="flex flex-col flex-1 overflow-y-auto bg-gray-400">
                          {messages.length === 0 ? (
                            <span>Start messaging</span>
                            ) : (
                            messages.map((m, index) => {
                                const currDate = getDate(m.created_at);
                                const prevDate = index > 0 ? getDate(messages[index - 1].created_at) : null;
                                const showDate = currDate !== prevDate;
                                const href = m.content.includes('http') ? m.content : `https://${m.content}`;
                                const split = m.content.split(" ");
                                return (
                                    <div
                                key = {m.id}>
                                {showDate && (
                                    <div className="flex justify-center my-2">
                                        <span className="rounded-full bg-gray-600 px-3 py-1 text-xs text-white">
                                            {currDate}
                                        </span>
                                    </div>
                                )}
                                        <div className="group relative">
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
                                {m.type === "text" && (
                                   split.map((w, index) => {
                                    const href = w.includes('http') ? w : `https://${w}`;
                                        return(
                                            isURL(w) ? (
                                                <a href={href}
                                                key={index}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 visited:text-purple-500"
                                                >
                                            {replyTo !== null && (
                                                <>
                                                {replyTo.content}
                                                </>
                                            )}
                                                {w}{" "}
                                                </a>
                                            ) : (
                                                <div className="flex flex-col">
                                                <span>
                                                    {m.reply && (
                                                        <div
                                                         className="border-l-3 border-blue-400 bg-blue-100 rounded-sm"
                                                        >
                                                        <div className="mx-3 py-2">
                                                        <p className="text-blue-400">
                                                            {m.reply?.sender_name}
                                                        </p>
                                                        <p>
                                                            {m.reply?.content}
                                                        </p>
                                                        </div>
                                                        </div>
                                                    )}
                                                </span>
                                                <span
                                                key={index}
                                                className="mt-1"
                                                >
                                                    {w} {" "}
                                                </span>
                                                </div>
                                            )
                                    )}))}
                                {m.type === "sticker" && (
                                    <img
                                        src={m.content}
                                        className="max-w-[180px] rounded-lg"
                                    />
                                )}
                                {m.attachments && m.attachments?.length > 0 && (
                                    <div className="gap-2 flex flex-col">
                                    <span>{m.content}</span>
                                    {m.attachments.map((f) => (
                                        <img
                                            key = {f.file_url}
                                            src={f.file_url}
                                            onClick={() => setOpenedImage(f.file_url)}
                                            className="max-w-[420px] rounded-lg hover:cursor-pointer"
                                        />
                                    ))}
                                    </div>
                                )}
                                {/* <div className="flex justify-between mt-1"> */}
                                <div
                                    className="opacity-0 text-sm text-white absolute w-[40px] px-1 p-0.5 rounded-lg group-hover:opacity-100 transition-all top-0 right-2 bg-gray-500"
                                >
                                    <button
                                        onClick={( () => setReplyTo(m) )}
                                        className="hover:cursor-pointer"
                                    >
                                    ↩
                                    </button>
                                </div>
                                {/* </div> */}
                                <div className="flex">
                                 {m.sender_id === user.id && (
                                    <span className="mr-4 text-xs text-blue-500">
                                    {otherUserId && m.read_by?.includes(otherUserId) ? "✓✓" : "✓"}
                                    </span>
                                )}
                                    <span
                                     className="text-[0.6rem] text-right flex ml-auto text-blue-500"
                                     >
                                        {getTime(m.created_at)}
                                    </span>
                                </div>
                                </span>
                                </div>
                                </div>
                                </div>
                                </div>
                            )})
                        )}
                            <ImageViewer
                                image={openedImage}
                                onClose={() => setOpenedImage(null)}
                            />
                        <div className="flex justify-end p-2">
                        <div className="flex flex-wrap gap-2 max-w-[1000px] justify-end">
                        {pendingImages.map((image, index) => 
                            <div className="relative w-[200px] h-[200px] flex justify-center items-center"
                                key={index}>
                                    {image.status === "uploading" && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                                           <LoaderCircle className="w-10 h-10 text-white animate-spin" />
                                            <span className="text-white font-semibold">
                                                {image.progress}%
                                            </span>
                                        </div>
                                    )}
                                    {image.status === "finished" && (
                                       <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded">
                                        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                                            <Check className="text-white w-7 h-7" />
                                        </div>
                                    </div>
                                    )}
                                    {image.status === "failed" && (
                                        <div className="absolute inset-0 bg-red-500/40 flex flex-col items-center justify-center rounded">
                                            <X className="w-10 h-10 text-white" />
                                            <span className="text-white mt-2">
                                                Upload failed
                                            </span>
                                    </div>
                                    )}
                                <button
                                    className="absolute top-2 left-2 flex h-8 w-8 items-center hover:cursor-pointer justify-center rounded-full bg-black/60 hover:bg-black/80 transition"
                                    onClick={() => {
                                        setPendingImages(prev => prev.filter((_, i) => i !== index))
                                }}
                                >✕</button>
                                <img
                                    className="w-full h-full rounded"
                                    src={URL.createObjectURL(image.file)}
                                     onLoad={() => {
                                        lastMessageRef.current?.scrollIntoView({
                                            behavior: "smooth"
                                        });
                                    }}
                                />
                            </div>
                        )}
                        </div>
                        </div>
                        <div ref={messagesEndRef} />
                        </div>
                        {replyTo !== null && (
                            <div
                                className="bg-gray-100 flex justify-between"
                            >
                            <div className="flex flex-col ml-5 my-2">
                                <p className="text-blue-800">
                                    Reply to {replyTo.sender_name}
                                </p>
                                <p className="text-black text-sm">
                                    {replyTo.content.length > 20 
                                    ? (replyTo.content.slice(0,20) + "...")
                                    : (replyTo.content)
                                    }
                                </p>
                            </div>
                            <button
                             onClick={ ()=>setReplyTo(null) }
                             className="mr-5 text-gray-500 hover:cursor-pointer"
                             >x</button>
                            </div>
                        )}
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
                            onPaste={handlePaste}
                            onChange={handleTyping}
                            className="w-full focus:outline-none placeholder:text-zinc-500"
                            />
                        {isStickerOpen && (
                        <div className="absolute bottom-13 right-6 w-[520px] h-[500px] bg-white shadow-lg rounded-lg overflow-y-auto z-50 no-scrollbar">
                            <Stickers onSelectSticker={handleSendSticker} />
                        </div>
                        )}
                            <Image
                            alt="stickers"
                            onClick={toggleStickers}
                            src={stickerImg}
                            className="w-[1.3rem] h-[1.3rem] mr-[10px] hover:cursor-pointer"
                            />
                            <Image
                            onClick={!finishedLoading ? handleSendMessage : undefined}
                            alt = "sendMsg"
                            src = {sendImg}
                            className={`w-[1.3rem] h-[1.3rem]
                                 ${finishedLoading 
                                   ? "opacity-50 cursor-not-allowed"
                                   : "hover:cursor-pointer"}`
                                }
                             />
                        </div>
                    </div>
                )
                }
        </div>
    )
}