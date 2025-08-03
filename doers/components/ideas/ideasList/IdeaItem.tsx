import { IdeaProps } from "@/interfaces/ideas"
import { ChatBubbleBottomCenterTextIcon, CheckCircleIcon, HeartIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const IdeaItem = ({ idea }: IdeaProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className='w-[75%] h-[160px] flex flex-row items-center justify-between bg-slate-200 rounded-primary shadow-primary my-2'>

      <Link className="w-full flex flex-row items-center justify-between" href={`http://localhost:3000/ideas/${idea.id}/`}>
        <div className='flex flex-row items-center justify-center ml-5 mr-2.5'>
          <Image src={idea?.logo} width={120} height={120} alt={`${idea.title}'s logo`} className="rounded-primary"/>

          <div className='h-26 flex flex-col items-start justify-between ml-5 mr-2.5'>
            <h1 className='max-w-[40vw] text-3xl text-fg font-bold overflow-scroll scrollbar-hide'>{idea.title}</h1>
            <h2 className='max-w-[40vw] text-xl text-fg font-light overflow-scroll scrollbar-hide'>{idea.doer}</h2>
            <h3 className='max-w-[40vw] text-xl text-fg italic overflow-scroll scrollbar-hide'>{idea.slogan}</h3>
          </div>
        </div>

        <div className='h-30 flex flex-col items-center justify-between ml-2.5 mr-5'>
          <h1 className="flex flex-row items-center justify-center">{idea.ideaSubscriptions.length}<CheckCircleIcon className="w-9 h-9" /></h1>
          <h1 className="flex flex-row items-center justify-center">{idea.ideaLikes.length}<HeartIcon className="w-9 h-9" /></h1>
          <h1 className="flex flex-row items-center justify-center">{idea.ideaComments.length}<ChatBubbleBottomCenterTextIcon className="w-9 h-9" /></h1>
        </div>
      </Link>
    </motion.div>
  )
}

export default IdeaItem
