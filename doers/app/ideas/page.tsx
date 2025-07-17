"use client"

import IdeaList from '@/components/ideas/ideasList/IdeaList'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Fuse from "fuse.js"
import { Idea } from '@/interfaces/ideas'
import FilterModal from '@/components/UI/modal/FilterModal'

const Page = () => {
  const [ideas, setIdeas] = useState<Idea[] | undefined>()
  const [query, setQuery] = useState("")
  const [activeCategories, setActiveCategories] = useState<string[]>([])

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

  return (
    <div className='w-[80vw] flex flex-col items-center justify-center mt-20'>
      <div className='w-[60vw] flex flex-row items-center justify-between mb-5'>
        <div>
          <input
            className='w-[25vw] h-14 p-3 border-[3px] border-slate-200 rounded-primary shadow-primary hover:border-fg focus:border-fg'
            placeholder='Search by title, doer or slogan'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <FilterModal sendActiveCategories={handleActiveCategories}/>
          <button className='w-[6vw] h-14 px-5 py-3 bg-slate-200 cursor-pointer rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-200'>Sort by</button>
        </div>
      </div>
      <IdeaList ideas={matchedIdeas} />
    </div>
  )
}

export default Page
