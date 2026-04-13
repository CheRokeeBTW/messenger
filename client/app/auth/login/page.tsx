"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, checkAuth } from "@/app/services/auth.services";

export default function LoginPage(){
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(true);
    const router = useRouter();

      useEffect(() => {
        const isAuth = async () => {
            try {
            const data = await checkAuth();
            router.push("/");
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

    const handleLogin = async() => {
        setIsLoading(true);

        try{
            const data = await loginUser(email,password);

            console.log('Successfull login:', data);
            setIsLoading(false);

            router.push('/');
            console.log(username)
        }
        catch(err){
            if(err instanceof Error){
                setError(err.message);
                setIsLoading(false);
                console.log(username)
            }
            else{
                setError('Login failed');
                setIsLoading(false);
            }
        }
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center gap-2">
                <h1>Welcome to our messenger!</h1>
                <form 
                    onSubmit={(e) =>{
                    e.preventDefault();
                    handleLogin();
                }}
                className="w-100 flex flex-col gap-2"
                >
                    <input
                        type="text"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name"
                        className="w-full pl-4 py-2 rounded-lg bg-zinc-800"
                        required
                    />
                    <input
                        type="password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className="w-full pl-4 py-2 rounded-lg bg-zinc-800"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                    type="submit"
                    className={`hover:cursor-pointer border rounded-lg ${
                        isLoading
                        ? "cursor-not-allowed bg-zinc-600"
                        : "bg-gray-700 hover:bg-gray-400"
                    }`}
                    >
                        {isLoading ? "logging in..." : "Enter the chat"}
                    </button>
                </form>
            </div>
        </div>
    )
}