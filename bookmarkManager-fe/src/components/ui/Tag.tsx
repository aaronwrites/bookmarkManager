import { useQuery } from "@tanstack/react-query";
import { getTagName } from "../../services/tagService";
import { useNavigate } from "react-router-dom";


type TagProps  = {
    id : string,
    removeTag?: (tagId: string) => void;
}

const Tag = ({ id, removeTag }: TagProps) => {
    const navigate = useNavigate();
    const { data, isPending } = useQuery({
        queryKey: ["tagName", id],
        queryFn: () => getTagName(id)
    })


      const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if(removeTag) { removeTag(id); }
      };

      const handleClick = () => {
        navigate(`/tag/${id}`)
      }
    

    if(isPending) {
        return <span className="p-2 border border-primary text-primary rounded-full">Loading...</span>
    }

	return <span className="relative transition-colors px-3 py-1.5 bg-muted/20 text-muted hover:bg-primary hover:text-white rounded-full group cursor-pointer" onClick={handleClick}>
        {data?.tagName}
        { removeTag && <button
        onClick={handleDelete}
        className="absolute z-50 hidden group-hover:block -top-2 -right-2 text-xs text-primary bg-background border border-primary rounded-full px-1.5 py-0.5"
      >
        X
      </button>}
    </span>;
};

export default Tag;
