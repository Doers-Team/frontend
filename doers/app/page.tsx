"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
        }}
        className="w-[60vw] mt-20 grid grid-cols-1 gap-20 justify-center items-center text-center">
            <div className="grid grid-cols-1 gap-10">
                <h1 className="text-fg text-8xl">Doers</h1>
                <h3 className="text-fg text-5xl">A Klondike of exiting Ideas from creative users who want to help. This project was created to improve people's/animals lifes, nature and other aspects of life. Thousands of people from all over the world unite to start a something bigger, thing that can develop a new form of casual objects. <b>Synergy leads to the best results.</b></h3>
            </div>
            <div className="mb-40 grid grid-cols-1 gap-10">
                <h1 className="text-fg text-8xl">Creator</h1>
                <Image src={"/assets/images/kiripupsik5.png"} className="mx-auto rounded-primary shadow-primary" width={400} height={400} alt="kiripupsik5's image"/>
                <h3 className="text-fg text-5xl italic">kiripupsik5</h3>
            </div>
        </motion.div>
    )
}