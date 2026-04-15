"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "./services/auth.services";
import Sidebar from "./components/Sidebar";

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

  useEffect(() => {
  const isAuth = async () => {
    try {
      const data = await checkAuth();
    } catch {
      router.push("/auth/login");
    }
    finally{
      setIsChecking(false);
    }
  };

  isAuth();
}, []);

if(isChecking) return(
  <div className="flex justify-center items-center h-screen">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
  </div>
)

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full h-full">
        <Sidebar onSelectConversation = {setSelectedChat}/>
      </div>
    </div>
  );
}
