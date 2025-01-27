import { useQuery } from "@tanstack/react-query";
import { getTagName } from "../../services/tagService";


type TagProps  = {
    id : string,
    removeTag: (tagId: string) => void;
}

const Tag = ({ id, removeTag }: TagProps) => {
    const { data, isPending } = useQuery({
        queryKey: ["tagName", id],
        queryFn: () => getTagName(id)
    })


      const handleDelete = () => {
        removeTag(id); // Trigger the deletion
      };
    

    if(isPending) {
        return <span className="p-2 border border-primary text-primary rounded-full">Loading...</span>
    }

	return <span className="relative px-3 py-1.5 bg-primary text-white rounded-full group">
        {data?.tagName}
        <button
        onClick={handleDelete}
        className="absolute hidden group-hover:block -top-2 -right-2 text-xs text-primary bg-background border border-primary rounded-full px-1.5 py-0.5"
      >
        X
      </button>
    </span>;
};

export default Tag;
