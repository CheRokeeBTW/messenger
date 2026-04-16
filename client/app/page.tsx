"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "./services/auth.services";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { useDispatch, UseDispatch } from "react-redux";
import { setUser } from "./redux/slices/authSlice";

type Conversation = {
  id: string;
  title: string | null;
  is_group: boolean;
  created_at: string;
};

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
  const isAuth = async () => {
    try {
      const data = await checkAuth();
      dispatch(setUser(data));
    } catch {
      router.push("/auth/login");
    }
    finally{
      setIsChecking(false);
    }
  };

  isAuth();
}, []);

console.log(selectedChat)

if(isChecking) return(
  <div className="flex h-screen">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
  </div>
)

  return (
    <div className="flex h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="h-full">
        <Sidebar onSelectConversation = {setSelectedChat}/>
      </div>
      <div className="flex flex-1">
        <ChatWindow selectedChat = {selectedChat}/>
      </div>
    </div>
  );
}
