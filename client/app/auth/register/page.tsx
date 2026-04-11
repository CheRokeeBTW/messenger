"use client";
import { useState } from "react";
import styles from './page.module.css';

export default function RegisterPage(){
    const [email, setEmail] = useState< string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const handleRegister = async () =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[A-Za-z\s-]+$/;

        if(!emailRegex.test(email)){
            setError('Enter a valid email');
            return
        }

        if(password.length < 4){
            setError('Password must be at least 4 characters');
            return
        }

        if (!usernameRegex.test(username)) {
            setError('Name must contain only letters');
            return
        }

        if(username.length < 2){
            setError('Name must be at least 2 characters');
            return
        }

        setIsLoading(true);

        try{
            const res = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password, username }),
            });

            setIsLoading(false);
            
           const data = await res.json();

            if (!res.ok) {
            setError(data.message);
            return;
            }
        }
            finally {
                setIsLoading(false);
            }
        // catch(error){
        //     if(error instanceof Error){
        //         setError(error.message);
        //         setIsLoading(false);
        //     }
        //     else{
        //         setError('Registration failed');
        //         setIsLoading(false);
        //     }
        // }
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-5">
                <h1 className="flex justify-center text-[1.2rem]">Create an account</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}
                className="w-100 flex flex-col gap-5"
            >
                <input
                    type="text"
                    placeholder="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                    required
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={isLoading}
                    className = {`hover:cursor-pointer border rounded-lg ${
                        isLoading
                        ? "bg-zinc-600 cursor-not-allowed"
                        : "bg-gray-400 hover:bg-gray-100"
                    }`}
                >
                    {isLoading ? "Creating an account" : "Register"}
                </button>
            </form>
        </div>
        </div>
    )
}