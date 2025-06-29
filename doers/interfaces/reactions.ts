export interface IdeaSubscription {
    id: string;
    idea: string;
    author: string;
    text: string;
    created_at: string;
    updated_at: string;
}
  
export interface IdeaLike {
    id: string;
    idea: string;
    author: string;
    created_at: string;
    updated_at: string;
}
  
export interface IdeaComment {
    id: string;
    idea: string;
    author: string;
    created_at: string;
    updated_at: string;
}