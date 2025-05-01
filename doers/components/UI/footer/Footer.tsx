"use client"

import { usePathname } from "next/navigation"
import TabLink from "../../TabLink"

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className='max-w-screen-xl flex justify-center mx-auto p-3 rounded-primary select-none'>
      <TabLink href="/info" upDown={false} text="&copy; 2025 DoersTeam" bgColor={pathname === "/info" ? "bg-neutral-700" : "bg-neutral-800"} borderColor={pathname === "/info" ? "border-neutral-500" : "border-neutral-600"}/>
    </footer>
  )
}

export default Footer
