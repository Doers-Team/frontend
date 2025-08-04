"use client";

import React, { useState} from 'react';
import { signin } from "@/services/auth";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import { motion } from "framer-motion";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await signin(username, password);
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          router.push("/ideas");
        } else {
          alert("Signin failed");
        }
    }

    return (
        <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
        }}
        className='w-[40vw] mt-28 flex justify-center items-center'>
            <form className='w-full grid grid-cols-1 gap-5 justify-center items-center' onSubmit={handleSubmit}>
                <h1 className='mb-10 text-fg text-7xl text-center'>Login</h1>

                <input name="username" className="w-full h-20 p-5 italic text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300" placeholder="USERNAME" required
                    onChange={e => setUsername(e.target.value)}
                />

                <input type="password" name="password" className="w-full h-20 p-5 italic text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300" placeholder="PASSWORD" required
                    onChange={e => setPassword(e.target.value)}
                />
                
                <Link href={"/register"}>
                    <h1 className='text-fg text-3xl text-center cursor-pointer transition-colors duration-300 hover:text-gray-500'>Want to register new Doer</h1>
                </Link>

                <div className="w-full mt-10 flex flex-wrap flex-row justify-center items-center">
                    <Link className='w-1/6' href={"/ideas"}>
                        <button type="button" className="w-full h-18 mr-5 p-5 bg-gray-200 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-gray-300">Cancel</button>
                    </Link>
                    <button type="submit" className="w-1/6 h-18 ml-5 p-5 bg-green-400 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-green-500">Login</button>
                </div>
            </form>
        </motion.div>
    );
};

export default Login;