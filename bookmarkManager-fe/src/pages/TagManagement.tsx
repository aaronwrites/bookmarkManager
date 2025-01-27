import { useQuery } from "@tanstack/react-query";
import Tag from "../components/ui/Tag";
import { getAllTags } from "../services/tagService";
import { tagType } from "../types/tagType";
import { Tags } from "lucide-react";


const TagManagement = () => {
  const { data, isLoading, error } = useQuery({
		queryKey: ["allTags"],
		queryFn: getAllTags, 
	});

	if (isLoading) {
		return <div>Loading tags...</div>;
	}

	if (error) {
		return <div>Error loading tags</div>;
	}

  return (
    <div className="min-h-screen p-5">
      <div className="mb-8 p-2 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
          Tags
          <Tags size={30} />
        </h2>
        <p className="text-muted">Click on any tag to view the contents associated with it</p>
      </div>
      <div className="w-full flex flex-wrap gap-2 items-center bg-white border-2 border-muted/20 rounded-xl p-4 shadow-lg">
            {data?.tags.map((tag : tagType) => {
              return <Tag id={tag._id} key={tag._id} />;
            })}
          </div>
    </div>
  )
}

export default TagManagement