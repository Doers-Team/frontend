import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Category } from '@/interfaces/ideas'

interface FilterModalProps {
  sendActiveCategories: (data: string[]) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ sendActiveCategories }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ideas/categories/')
      setCategories(response.data)
      setActiveCategories(response.data.map((category: Category) => category.value))
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data || error.message)
      } else {
        console.error('Error:', error)
      }
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const toggleModal = () => {
    setIsOpen((prev) => !prev)
  }

  const toggleCategoryStatus = (categoryValue: string) => {
    setActiveCategories(prev =>
      prev.includes(categoryValue)
        ? prev.filter(item => item !== categoryValue)
        : [...prev, categoryValue]
    )
  }

  useEffect(() => {
    sendActiveCategories(activeCategories)
  }, [activeCategories, sendActiveCategories])

  return (
    <>
      <button
        onClick={toggleModal}
        className="w-[8vw] h-14 mr-5 px-5 py-3 cursor-pointer bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-200"
      >
        Filter
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={toggleModal}
            className="absolute inset-0 bg-gray-500/75 backdrop-blur-[3px] blur-[3px]"
          />

          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-screen-xl w-[80vw] h-[600px] bg-bg rounded-primary p-5 grid grid-cols-6 grid-rows-3 gap-5 justify-center items-center text-center shadow-primary"
          >
            {categories.length > 0 ? (
              categories.map((category) => {
                const isActive = activeCategories.includes(category.value)

                return (
                  <div
                    key={category.value}
                    onClick={() => toggleCategoryStatus(category.value)}
                    className={`
                      px-6 py-8 rounded-primary shadow-primary text-center cursor-pointer
                      transition-colors duration-200
                      ${isActive ? 'bg-slate-300 hover:bg-stone-300' : 'bg-slate-100 hover:bg-stone-200'}
                    `}
                  >
                    {category.label}
                  </div>
                )
              })
            ) : (
              <h1>No categories</h1>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FilterModal
