"use client"

import TabLink from "../../TabLink";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='bg-transparent text-fg max-w-screen-xl flex flex-wrap justify-between mx-auto rounded-xl select-none'>
      <div>
        <TabLink href="/" text="Doers" textSize="text-5xl" bgColor={pathname === "/" ? "bg-neutral-700" : "bg-neutral-800"} borderColor={pathname === "/" ? "border-neutral-500" : "border-neutral-600"}/>
      </div>
      <div className='flex flex-row flex-wrap'>
        <TabLink href="/" text="Home" mx="mx-1" bgColor={pathname === "/" ? "bg-neutral-700" : "bg-neutral-800"} borderColor={pathname === "/" ? "border-neutral-500" : "border-neutral-600"}/>
        <TabLink href="/ideas" text="Ideas" mx="mx-1" bgColor={pathname === "/ideas" ? "bg-neutral-700" : "bg-neutral-800"} borderColor={pathname === "/ideas" ? "border-neutral-500" : "border-neutral-600"}/>
        <TabLink href="/info" text="Info" mx="mx-1" bgColor={pathname === "/info" ? "bg-neutral-700" : "bg-neutral-800"} borderColor={pathname === "/info" ? "border-neutral-500" : "border-neutral-600"}/>
      </div>
    </nav>
  )
}

export default Navbar
