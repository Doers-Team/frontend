import { IdeaProps } from "@/interfaces/ideas";
import { ChatBubbleBottomCenterTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useState, useEffect } from "react";
import { getProfile } from "@/services/auth";

const IdeaItem = ({ idea }: IdeaProps) => {
  const [likesCount, setLikesCount] = useState(idea.ideaLikes.length);
  const [liked, setLiked] = useState(false);

  const fetchLikesAndStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/ideas/${idea.id}/reactions/`);
      setLikesCount(res.data.likes.length);
    } catch (error) {
      console.error("Failed to fetch likes status", error);
    }
  };

  useEffect(() => {
    fetchLikesAndStatus();

    const fetchLiked = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        const res = await axios.get(`http://localhost:8000/api/ideas/${idea.id}/reactions/like/`);
        const profile = await getProfile(token);
        const isLiked = res.data.some((like: any) => like.author === profile.id);
        setLiked(isLiked);
      }
    }

    fetchLiked()

  }, [idea.id, likesCount]);

  const likeIdea = async () => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/ideas/${idea.id}/reactions/like/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.detail || 'Liking Error');
        }
        throw error;
      }
    }
  };

  const handleLike = async () => {
    try {
      await likeIdea();
      await fetchLikesAndStatus();
    } catch (err) {
      console.error("Error toggling like", err);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      className='w-[75%] h-[160px] flex flex-row items-center justify-between bg-slate-200 rounded-primary shadow-primary my-2'
    >
      <Link className="w-full flex flex-row items-center justify-between" href={`http://localhost:3000/ideas/${idea.id}/`}>
        <div className='flex flex-row items-center justify-center ml-5 mr-2.5'>
          <Image src={idea?.logo} width={120} height={120} alt={`${idea.title}'s logo`} className="aspect-square rounded-primary" />

          <div className='h-26 flex flex-col items-start justify-between ml-5 mr-2.5'>
            <h1 className='max-w-[40vw] text-3xl text-fg font-bold overflow-scroll scrollbar-hide'>{idea.title}</h1>
            <h2 className='max-w-[40vw] text-xl text-fg font-light overflow-scroll scrollbar-hide'>{idea.doer}</h2>
            <h3 className='max-w-[40vw] text-xl text-fg italic overflow-scroll scrollbar-hide'>{idea.slogan}</h3>
          </div>
        </div>
      </Link>

      <div className='grid grid-cols-1 gap-5 items-center justify-center ml-2.5 mr-5'>
        {/*<h1 className="flex flex-row items-center justify-center select-none">
          {idea.ideaSubscriptions.length}
          <CheckCircleIcon className="w-9 h-9" />
        </h1>*/}

        <h1 onClick={handleLike} className="flex cursor-pointer flex-row items-center justify-center select-none">
          {likesCount}
          {liked ? (
            <HeartSolid className="w-12 h-12 text-red-500" />
          ) : (
            <HeartOutline className="w-12 h-12" />
          )}
        </h1>

        <Link href={`/ideas/${idea.id}`}>
          <h1 className="flex flex-row items-center justify-center select-none">
            {idea.ideaComments.length}
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12" />
          </h1>
        </Link>
      </div>
    </motion.div>
  );
};

export default IdeaItem;
