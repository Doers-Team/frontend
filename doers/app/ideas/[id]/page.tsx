"use client"

import { useParams } from 'next/navigation'
import IdeaProfile from "@/components/ideas/IdeaProfile"
import axios from 'axios'
import { useEffect, useState } from 'react'

const Page = () => {
  const { id } = useParams()
  const [idea, setIdea] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ideas/${id}/`)
        setIdea(response.data)
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('Server error:', error.response?.data || error.message)
        } else {
          console.error('Error:', error)
        }
      }
    }

    if (id) fetchData()
  }, [id])

  if (!idea) {
    return <h1>Loading...</h1>
  }

  return <IdeaProfile idea={idea} />
}

export default Page
