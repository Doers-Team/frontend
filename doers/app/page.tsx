"use client";

import {useEffect, useState} from "react";

export default function Home() {
    const [message, setMessage] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://localhost:8000/api/user', {
                        credentials: 'include',
                    });

                    const content = await response.json();

                    setMessage(`Hi ${content.name}`);
                    setAuth(true);
                } catch (e) {
                    setMessage('You are not logged in');
                    setAuth(false);
                }
            }
        )();
    });

    console.log(auth)

    return (
        <>{message}, {auth}</>
    )
}