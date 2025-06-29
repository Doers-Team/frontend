"use client"

import { usePathname } from "next/navigation";
import PageSwitcher from "@/components/PageSwitcher";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 z-5 bg-transparent text-fg max-w-screen-xl flex flex-wrap justify-between mx-auto rounded-xl select-none'>
      <PageSwitcher/>
    </nav>
  )
}

export default Navbar
