"use client"

import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { Category } from "@/interfaces/ideas"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesDDIsOpen, setCategoriesDDIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(["select_idea_category", "Select idea category"]);

  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("business_and_startups");

  const router = useRouter();

  const categoriesDDBtnRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slogan", slogan);
    formData.append("description", description);
    formData.append("category", category);

    const res = await fetch("http://localhost:8000/api/ideas/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("Idea created");
    } else {
      const error = await res.json();
      console.error(error);
      alert("Idea creation error");
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("access");
      if (!token) {
        router.push("/login");
      }
  }, [])

  useEffect(() => {
    const handleCategoriesDD = (e: MouseEvent) => {
      const ref = categoriesDDBtnRef.current;
      if (ref && ref.contains(e.target as Node)) {
        setCategoriesDDIsOpen((prev) => !prev);
      } else {
        setCategoriesDDIsOpen(false);
      }
    };

    window.addEventListener("click", handleCategoriesDD);
    return () => {
      window.removeEventListener("click", handleCategoriesDD);
    };
  }, []);

  const selectCategory = (category: Category) => {
    setSelectedCategory([category.value, category.label]);
    setCategoriesDDIsOpen(false);
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className="w-[60vw] flex flex-col items-center justify-between mt-16">
        <h1 className="text-fg text-7xl">Let's start</h1>

        <div className="w-2/3 mt-10">
          <input
            className='w-full h-20 p-5 font-bold text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='TITLE'
          />
        </div>

        <div className="w-2/3 mt-5">
          <input
            className='w-full h-20 p-5 italic text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='SLOGAN'
          />
        </div>

        <div className="w-2/3 mt-5 text-center justify-center items-center align-middle">
          <textarea
            className='w-full h-50 p-5 justify-center items-center align-middle resize-none text-center scrollbar-hide bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='DESCRIPTION'
          ></textarea>
        </div>

        <div className="relative inline-block w-2/3 mt-5 text-center justify-center items-center align-middle">
          <input ref={categoriesDDBtnRef} type="button" value={selectedCategory[1]} className="w-2/3 p-5 bg-transparent border-2 border-fg cursor-pointer transition-colors duration-300 hover:text-gray-600 hover:border-gray-400 rounded-primary shadow-primary"/>
          
          <div className={`${categoriesDDIsOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"} transition-all duration-300 ease-in-out transform origin-center absolute grid grid-cols-1 gap-3 w-2/3 max-h-80 left-1/6 -top-52 p-5 overflow-auto bg-slate-100 rounded-primary shadow-primary`}>
            {categories.length > 0
              ? categories.map((category) => (
                <h2 key={category.value} onClick={() => selectCategory(category)} className={`${category.value === selectedCategory[0] ? "bg-slate-300" : "bg-slate-200"} w-full h-16 p-5 cursor-pointer rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300`}>{category.label}</h2>
              ))
              : <h2>No categories...</h2>
            }
          </div>
        </div>

        <div className="w-full mt-10 flex flex-wrap flex-row justify-center items-center">
          <button className="w-1/6 h-18 mr-5 p-5 bg-gray-200 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-gray-300">Cancel</button>
          <button className="w-1/6 h-18 ml-5 p-5 bg-green-400 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-green-500">Continue</button>
        </div>
    </motion.div>
  )
}

export default page