import { IdeaSubscription, IdeaLike, IdeaComment } from "./reactions";

export interface Category {
    value: string;
    label: string;
}

export interface Image {
    id: number;
    reference_image: string;
}

export interface Idea {
    id: string;
    title: string;
    description: string;
    logo: string;
    slogan: string;
    images: Image[];
    category: string;
    reference_video: string;
    ideaSubscriptions: IdeaSubscription[];
    ideaLikes: IdeaLike[];
    ideaComments: IdeaComment[];
    doer: string;
    created_at: string;
    updated_at: string;
}

export interface IdeaProps {
    idea: Idea,
}

export interface IdeaListProps {
    ideas: Idea[];
}