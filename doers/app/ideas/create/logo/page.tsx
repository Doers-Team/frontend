"use client"

import Warning from '@/components/UI/warning/Warning'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { motion } from "framer-motion"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";

interface Logo {
  logo: File;
  url : string;
};

const Page = () => {
  const dragDropField = useRef<HTMLLabelElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [logo, setLogo] = useState<Logo | null>(null)

  const router = useRouter();

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

  useEffect(() => {
    const token = localStorage.getItem("access");
      if (!token) {
        router.push("/login");
      }
  }, [])


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
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className='relative w-full flex justify-center items-center'>
      
      <XMarkIcon className="absolute text-fg top-0 right-0 m-5 w-10 h-10 cursor-pointer hover:text-gray-500"/>

      <div className="w-[60vw] flex flex-col items-center justify-between mt-16">
        {logo
          ? <>
              <h1 className="text-fg text-7xl text-center">Your Idea logo</h1>
              <div className='relative group flex justify-center items-center w-1/2'>
                <img
                  src={logo.url}
                  alt="Uploaded logo"
                  className="mt-10 w-full aspect-square rounded-primary shadow-primary transition-all duration-300 group-hover:bg-gray-500/75 group-hover:backdrop-blur-[3px] group-hover:blur-[3px] group-hover:brightness-75"
                />
                <TrashIcon onClick={clearLogo} className='absolute opacity-0 text-bg text-center w-10 h-10 cursor-pointer transition-all duration-300 group-hover:opacity-100 hover:text-gray-300'/>
              </div>
            </>
          : <>
              <h1 className="text-fg text-7xl text-center">Upload your Idea logo</h1>

              <label
                ref={dragDropField}
                className={`relative flex justify-center items-center w-1/2 aspect-square mt-10 text-fg rounded-primary shadow-primary transition-all duration-300 cursor-pointer hover:bg-slate-300
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

        <div className="w-full mt-10 flex flex-wrap flex-row justify-center items-center">
          <button className="w-1/6 h-18 mr-5 p-5 bg-gray-200 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-gray-300">
            Back
          </button>
          <button className="w-1/6 h-18 ml-5 p-5 bg-green-400 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-green-500">
            Continue
          </button>
        </div>
      </div>
      {/*<Warning text={"Pizda"}/>*/}
    </motion.div>
  )
}

export default Page
