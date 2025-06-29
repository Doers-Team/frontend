import { IdeaProps } from "@/interfaces/ideas"

const IdeaProfile = ({ idea }: IdeaProps) => {
    return (
        <div className='w-[60vw] flex flex-col items-center justify-between mt-20'>
            <div className='w-full flex flex-row items-center justify-between'>
                <div className="flex flex-col items-center justify-between">
                    <h1 className="bg-slate-200 text-5xl text-fg rounded-primary shadow-primary p-5 font-bold mb-2.5">{idea.title}</h1>
                    <h2 className="bg-slate-200 text-2xl text-fg rounded-primary shadow-primary p-5 font-light mt-2.5">{idea.doer}</h2>
                </div>
                <img className='w-50 h-50 bg-green-500 rounded-primary'/>
            </div>
            <h3 className="bg-slate-200 text-5xl text-fg rounded-primary shadow-primary p-5 italic mt-5">{idea.slogan}</h3>
        </div>
    )
}
  
export default IdeaProfile