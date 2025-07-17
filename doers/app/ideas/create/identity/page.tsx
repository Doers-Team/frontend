const page = () => {
  return (
    <div className="w-[60vw] flex flex-col items-center justify-between mt-20">
        <h1 className="text-fg text-7xl">Let's start</h1>
        <div className="w-2/3 mt-10">
          <input
            className='w-full h-20 p-5 font-bold text-center border-[3px] bg-slate-200 border-slate-200 rounded-primary shadow-primary hover:bg-slate-300 hover:border-slate-300 focus:border-fg'
            placeholder='TITLE'
          />
        </div>

        <div className="w-2/3 mt-5">
          <input
            className='w-full h-20 p-5 italic text-center border-[3px] bg-slate-200 border-slate-200 rounded-primary shadow-primary hover:bg-slate-300 hover:border-slate-300 focus:border-fg'
            placeholder='SLOGAN'
          />
        </div>

        <div className="w-2/3 mt-5 text-center justify-center items-center align-middle">
          <textarea
            className='w-full h-50 p-5 justify-center items-center align-middle resize-none text-center scrollbar-hide border-[3px] bg-slate-200 border-slate-200 rounded-primary shadow-primary hover:bg-slate-300 hover:border-slate-300 focus:border-fg'
            placeholder='DESCRIPTION'
          ></textarea>
        </div>

        <div className="w-full mt-10 flex flex-wrap flex-row justify-center items-center">
          <button className="w-1/6 h-18 mr-5 p-5 bg-gray-200 rounded-primary cursor-pointer transition-colors duration-200 hover:bg-gray-300">Cancel</button>
          <button className="w-1/6 h-18 ml-5 p-5 bg-green-400 rounded-primary cursor-pointer transition-colors duration-200 hover:bg-green-500">Continue</button>
        </div>
    </div>
  )
}

export default page