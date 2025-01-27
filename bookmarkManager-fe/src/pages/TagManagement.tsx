import { useQuery } from "@tanstack/react-query";
import Tag from "../components/ui/Tag";
import { getAllTags } from "../services/tagService";
import { tagType } from "../types/tagType";


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
      <div className="w-full flex flex-wrap gap-2 items-center bg-white rounded-xl p-4">
            {data?.tags.map((tag : tagType) => {
              return <Tag id={tag._id} key={tag._id} />;
            })}
          </div>
    </div>
  )
}

export default TagManagement