import { IdeaListProps } from "@/interfaces/ideas"
import IdeaItem from "./IdeaItem"

const IdeaList = ({ ideas }: IdeaListProps) => {
    if (!ideas) return <div>Loading...</div>;

    return (
        <>
            {ideas.length > 0
                ? ideas.map((idea) => (
                    <IdeaItem key={idea.id} idea={idea} />
                ))
                : <h1 className="mt-10 text-2xl text-fg">No ideas</h1>
            }
        </>
    );
}

export default IdeaList
