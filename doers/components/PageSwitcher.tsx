import React from 'react'
import { usePathname } from "next/navigation";
import { SparklesIcon, HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { urls } from '@/utils/urls';
import Link from 'next/link';

const PageSwitcher = () => {
  const pathname = usePathname();

  return (
    <div className='flex items-center justify-center mt-6 p-3'>
      <Link href={urls.ideas}><SparklesIcon className={`text-fg mr-3 p-3 rounded-primary hover:text-gray-600 hover:scale-110 duration-300 ${pathname === urls.ideas ? 'bg-slate-200 w-18 h-18 shadow-primary' : 'w-16 h-16'}`} /></Link>
      <Link href={urls.default}><HomeIcon className={`text-fg p-3 rounded-primary hover:text-gray-600 hover:scale-110 duration-300 ${pathname === urls.default ? 'bg-slate-200 w-18 h-18 shadow-primary' : 'w-16 h-16'}`} /></Link>
      <Link href={urls.info}><InformationCircleIcon className={`text-fg ml-3 p-3 rounded-primary hover:text-gray-600 hover:scale-110 duration-300 ${pathname === urls.info ? 'bg-slate-200 w-18 h-18 shadow-primary' : 'w-16 h-16'}`} /></Link>
    </div>
  )
}

export default PageSwitcher
