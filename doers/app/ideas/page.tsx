"use client"

import IdeaList from '@/components/ideas/ideasList/IdeaList'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Fuse from "fuse.js"
import { Idea } from '@/interfaces/ideas'
import FilterModal from '@/components/UI/modal/FilterModal'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import Link from 'next/link'

const Page = () => {
  const [ideas, setIdeas] = useState<Idea[] | undefined>()
  const [query, setQuery] = useState("")
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ideas/')
        setIdeas(response.data)
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('Server error:', error.response?.data || error.message)
        } else {
          console.error('Error:', error)
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("access");
      if (token) {
        setIsToken(true)
      }
  }, [])

  const handleActiveCategories = (data: string[]) => {
    setActiveCategories(data)
  }

  const matchedIdeas = useMemo(() => {
    if (!ideas) return []

    const filteredIdeas = ideas.filter((idea) => activeCategories.includes(idea.category))

    const fuse = new Fuse(filteredIdeas, {
      keys: ["title", "doer", "slogan"],
      threshold: 0.3,
    })

    return query ? fuse.search(query).map(result => result.item) : filteredIdeas
  }, [ideas, query, activeCategories])

  const clearQuery = () => {
    setQuery("");
  }

  return (
    <div className='w-[80vw] flex flex-col items-center justify-center mt-20'>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        className='w-[60vw] flex flex-row items-center justify-between mb-5'>
        <div className='relative'>
          <input
            className='w-[25vw] h-16 p-5 border-2 border-black rounded-primary shadow-primary transition-colors duration-300 hover:text-gray-500 hover:border-gray-400 focus:border-fg'
            placeholder='Search by title, doer or slogan'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <XMarkIcon onClick={clearQuery} className={`${query.length > 0 ? "opacity-100" : "opacity-0"} transition-opacity duration-300 absolute text-fg top-0 right-0 m-5 w-6 h-6 cursor-pointer hover:text-gray-500`}/>
        </div>
        <div className='flex gap-3 items-center justify-between'>
          {isToken ? 
            <Link href='/ideas/create/'>
              <PlusIcon className='w-[4vw] h-16 p-5 text-fg bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300' />
            </Link>
            :
            <Link href='/login'>
              <div className="relative group">
                <PlusIcon className='w-[4vw] h-16 p-5 text-gray-500 bg-gray-300 rounded-primary shadow-primary opacity-50 pointer-events-none' />
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-fg text-bg text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Login required
                </div>
              </div>
            </Link>
          }
          <FilterModal sendActiveCategories={handleActiveCategories}/>
          {/*<button className='w-[6vw] h-16 px-5 py-3 bg-slate-200 cursor-pointer rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300'>Sort by</button>*/}
        </div>
      </motion.div>
      <IdeaList ideas={matchedIdeas} />
    </div>
  )
}

export default Page
