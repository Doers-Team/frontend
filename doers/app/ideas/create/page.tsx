"use client"

import { useEffect, useRef, useState } from "react"
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Category } from "@/interfaces/ideas"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link"

interface Logo {
  logo: File;
  url : string;
};

const page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesDDIsOpen, setCategoriesDDIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(["select_idea_category", "Select idea category"]);
  const dragDropField = useRef<HTMLLabelElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [logo, setLogo] = useState<Logo | null>(null)

  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");

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
    formData.append("id", title.slice(0, 50));
    formData.append("title", title);
    formData.append("slogan", slogan);
    formData.append("description", description);
    if (selectedCategory) formData.append("category", selectedCategory[0]);
    if (logo) formData.append("logo", logo.logo);

    const res = await fetch("http://localhost:8000/api/ideas/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });

    if (res.ok) {
      alert("Idea created");
      router.push("/ideas");
    } else {
      console.log(localStorage.getItem("access"))
      const error = await res.json();
      console.error(error);
      alert("Idea creation error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
        router.push("/login");
    } else {
        fetchCategories()
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

  useEffect(() => {
    const field = dragDropField.current
    if (!field) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const droppedLogo = e.dataTransfer.files[0]
        const url = URL.createObjectURL(droppedLogo)
        setLogo({logo: droppedLogo, url: url})

        if (e.dataTransfer.files.length > 1) {
          alert("stupid femboy")
        }
        
        //const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 5)
        //setFiles(prev => [...prev, ...droppedFiles])
      }
    }

    field.addEventListener("dragover", handleDragOver)
    field.addEventListener("dragleave", handleDragLeave)
    field.addEventListener("drop", handleDrop)

    return () => {
      field.removeEventListener("dragover", handleDragOver)
      field.removeEventListener("dragleave", handleDragLeave)
      field.removeEventListener("drop", handleDrop)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (logo) {
        URL.revokeObjectURL(logo.url)
      }
    }
  }, [logo])

  const selectCategory = (category: Category) => {
    setSelectedCategory([category.value, category.label]);
    setCategoriesDDIsOpen(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const droppedLogo = e.target.files[0]
      const url = URL.createObjectURL(droppedLogo)
      setLogo({logo: droppedLogo, url: url})

      //const droppedFiles = Array.from(e.target.files).slice(0, 5)
      //setFiles(prev => [...prev, ...droppedFiles])
    }
  }

  const clearLogo = () => {
    setLogo(null)
  }

  return (
    <motion.form
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      onSubmit={handleSubmit}
      className="w-[60vw] flex flex-col items-center justify-between mt-16">
        <h1 className="text-fg text-7xl">Create your Idea</h1>

        <div className="w-2/3 mt-10">
          <input
            className='w-full h-20 p-5 font-bold text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='TITLE'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-2/3 mt-5">
          <input
            className='w-full h-20 p-5 italic text-center bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='SLOGAN'
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
        </div>

        <div className="w-2/3 mt-5 text-center justify-center items-center align-middle">
          <textarea
            className='w-full h-50 p-5 justify-center items-center align-middle resize-none text-center scrollbar-hide bg-slate-200 rounded-primary shadow-primary hover:bg-stone-200 transition-colors duration-300 focus:bg-slate-300'
            placeholder='DESCRIPTION'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {logo
          ? <>
              <div className='relative group flex justify-center items-center w-1/2'>
                <img
                  src={logo.url}
                  alt="Uploaded logo"
                  className="mt-5 w-full aspect-square rounded-primary shadow-primary transition-all duration-300 group-hover:bg-gray-500/75 group-hover:backdrop-blur-[3px] group-hover:blur-[3px] group-hover:brightness-75"
                />
                <TrashIcon onClick={clearLogo} className='absolute opacity-0 text-bg text-center w-10 h-10 cursor-pointer transition-all duration-300 group-hover:opacity-100 hover:text-gray-300'/>
              </div>
            </>
          : <>
              <label
                ref={dragDropField}
                className={`relative flex justify-center items-center w-1/2 aspect-square mt-5 text-fg rounded-primary shadow-primary transition-all duration-300 cursor-pointer hover:bg-slate-300
                  ${isDragOver ? "bg-slate-300" : "bg-slate-200"}`}
              >
                <h2 className="absolute text-xl text-center">
                  {isDragOver ? "Drop the file" : "Upload, paste or drop"}
                </h2>
                <input
                  className="hidden"
                  type="file"
                  accept=".jpeg, .png, .ico, .gif, .tiff, .webp, .eps, .svg, .psd, .indd, .cdr, .ai, .raw"
                  required
                  onChange={handleFileChange}
                />
              </label>
            </>
        }

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

        <div className="w-full mt-10 flex flex-wrap flex-row justify-center items-center mb-28">
          <Link className="w-1/6" href={"/ideas"}>
            <button className="w-full h-18 mr-5 p-5 bg-gray-200 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-gray-300">Cancel</button>
          </Link>
          <button type="submit" className="w-1/6 h-18 ml-5 p-5 bg-green-400 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-green-500">Continue</button>
        </div>
    </motion.form>
  )
}

export default page