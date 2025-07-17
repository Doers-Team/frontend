import { IdeaProps } from "@/interfaces/ideas"
import { HeartIcon, HomeIcon } from '@heroicons/react/24/outline';

const IdeaItem = ({ idea }: IdeaProps) => {
  return (
    <div className='w-[75%] h-[160px] flex flex-row items-center justify-between bg-slate-200 rounded-primary shadow-primary my-2'>
      <div className='flex flex-row items-center justify-center ml-5 mr-2.5'>
        <img className='w-30 h-30 bg-green-500 rounded-primary'/>

        <div className='h-26 flex flex-col items-start justify-between ml-5 mr-2.5'>
          <h1 className='text-3xl text-fg font-bold'>{idea.title}</h1>
          <h2 className='text-xl text-fg font-light'>{idea.doer}</h2>
          <h3 className='text-xl text-fg italic'>{idea.slogan}</h3>
        </div>
      </div>
      <div className='h-26 flex flex-col items-center justify-between ml-2.5 mr-5'>
        <h1 className="flex flex-row items-center justify-center">{idea.ideaSubscriptions.length} <HeartIcon className="w-9 h-9" /></h1>
        <h1 className="flex flex-row items-center justify-center">{idea.ideaLikes.length} <HeartIcon className="w-9 h-9" /></h1>
        <h1 className="flex flex-row items-center justify-center">{idea.ideaComments.length} <HeartIcon className="w-9 h-9" /></h1>
      </div>
    </div>
  )
}

export default IdeaItem
