import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Category } from '@/interfaces/ideas';

const FilterModal = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ideas/categories/')
      setCategories(response.data)
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

  useEffect(() => {
    console.log(categories)
  }, [categories])

  const toggleModal = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  return (
    <>
      <button onClick={toggleModal} className='w-[8vw] h-14 mr-5 px-5 py-3 bg-slate-300 rounded-primary shadow-primary hover:bg-stone-300 transition-colors duration-200'>Filter</button>
      <div ref={modalRef} className={`absolute z-10 ${isOpen ? "block" : "hidden"}`}>
        <div onClick={toggleModal} className="fixed inset-0 bg-gray-500/75 backdrop-blur-[3px] blur-[3px] transition-opacity"></div>

        <div className="fixed inset-5 grid grid-cols-6 grid-rows-3 gap-5 justify-center items-center text-center">
          {categories.length > 0 
            ? categories.map((category) => (
              <div key={category.value} className='px-6 py-8 bg-slate-300 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-200'>{category.label}</div>
            ))
            : <h1>No categories</h1>
          }
        </div>
      </div>
    </>
  )
}

export default FilterModal
