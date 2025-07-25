import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const closeMessage = () => {
    setIsOpen(false);
  }

  return (
    <div className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-10 flex justify-center items-start pt-10`}>
      <div className="absolute inset-0 backdrop-blur-[1px] blur-[1px] brightness-75" />

      <div
        className={`relative grid gap-5 max-w-screen-xl w-[30vw] bg-slate-200 rounded-primary p-5 justify-center items-center text-center shadow-primary transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-40"
        }`}
      >
        <XMarkIcon onClick={closeMessage} className="absolute top-3 right-3 w-6 h-6 text-fg cursor-pointer hover:text-gray-600" />

        <h1 className="text-3xl font-semibold text-fg">Message</h1>
        <p className="text-xl text-fg italic">{text}</p>

        {/*<button className="p-5 bg-slate-300 rounded-primary cursor-pointer shadow-primary transition-colors duration-200 hover:bg-slate-400">
          Okay
        </button>*/}
      </div>
    </div>
  );
};

export default Message;
