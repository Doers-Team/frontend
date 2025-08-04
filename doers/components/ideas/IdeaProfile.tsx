import { IdeaProps } from "@/interfaces/ideas";
import Image from "next/image";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const IdeaProfile = ({ idea }: IdeaProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [comments, setComments] = useState(idea.ideaComments || []);
  const [commentText, setCommentText] = useState("");

  const openImageModal = (src: string) => {
    setImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setImageSrc(null);
  };

  const commentIdea = async () => {
    const token = localStorage.getItem("access");
    if (!token || !commentText.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/ideas/${idea.id}/reactions/comment/`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prev) => [...prev, response.data]);
      setCommentText("");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.detail || "Comment creation Error");
      }
    }
  };

  return (
    <div className="w-[70vw] grid grid-cols-1 gap-10 items-center justify-between mt-20">
      <h1 className="bg-slate-200 text-6xl text-fg overflow-scroll scrollbar-hide rounded-primary shadow-primary p-10 font-bold">
        {idea.title}
      </h1>

      <div className="w-full flex flex-row items-center justify-between">
        <div className="grid grid-rows-2 grid-cols-1 gap-5 items-center justify-between text-center">
          <h2 className="w-3/4 row-span-2 bg-slate-200 text-4xl text-fg overflow-scroll scrollbar-hide rounded-primary shadow-primary p-5 italic">
            {idea.slogan}
          </h2>
          <h3 className="w-2/4 bg-slate-200 text-3xl text-fg overflow-scroll scrollbar-hide rounded-primary shadow-primary p-5 font-light">
            {idea.doer}
          </h3>
        </div>
        <Image
          onClick={() => openImageModal(idea?.logo)}
          src={idea?.logo}
          width={300}
          height={300}
          alt={`${idea.title}'s logo`}
          className="rounded-primary shadow-primary cursor-pointer"
        />
      </div>

      <h4 className="max-h-[400px] break-words overflow-scroll scrollbar-hide bg-slate-200 text-xl text-fg rounded-primary shadow-primary p-5">
        {idea.description}
      </h4>

      {isImageModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            onClick={closeImageModal}
            className="absolute inset-0 bg-gray-500/75 backdrop-blur-[3px] blur-[3px] brightness-75"
          />

          <div className="relative max-w-screen-xl justify-center items-center text-center">
            {imageSrc && (
              <img
                src={imageSrc}
                alt={`${imageSrc} image`}
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-primary shadow-primary"
              />
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-5 mb-20">
        {comments.length > 0 &&
          comments.map((comment) => (
            <p
              key={comment.id}
              className="max-h-[300px] bg-slate-200 text-xl p-5 text-center rounded-primary shadow-primary break-words overflow-scroll scrollbar-hide"
            >
              {comment.text}
            </p>
          ))}

        <div className="max-h-[300px] group">
          <input
            placeholder="COMMENT"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full bg-slate-200 text-xl p-5 text-center rounded-primary shadow-primary break-words overflow-scroll scrollbar-hide"
          />
          <div
            onClick={commentIdea}
            className="w-full mt-2 p-5 flex items-center justify-center bg-slate-200 text-center rounded-primary shadow-primary opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible hover:bg-stone-200 cursor-pointer"
          >
            <CheckIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaProfile;
