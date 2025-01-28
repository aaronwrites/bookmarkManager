import { SearchIcon } from "lucide-react";
import { useState } from "react"
import { Input } from "../components/ui/Input";
import { contentType } from "../types/contentTypes";
import { searchContents } from "../services/contentService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ContentCard from "../components/ui/ContentCard";
import Modal from "../components/ui/Modal";
import ContentModal from "../components/ContentModal";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [selectedContent, setSelectedContent] = useState<contentType | null>(
    null
  );
  const { data, isPending, isError } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => {
      if(debouncedSearchQuery) {
        return searchContents(debouncedSearchQuery)
      }
      return null
    }
  })




    if (isPending) {
      return (
          <div className="min-h-screen flex justify-center items-center">
              <p className="text-xl text-muted font-bold">Searching Contents...</p>
          </div>
          );
    }

    if (isError) {
      return (
          <div className="min-h-screen flex justify-center items-center">
              <p className="text-xl text-primary font-bold">Error fetching results</p>
          </div>
          );
    }
  return (
    <div className="min-h-screen p-5">
      <div className="mb-5 p-2 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
          Search Bookmarks
          <SearchIcon />
        </h2>
        <p className="text-muted">Note: Currently the search results are based on the title, tldr and tags you assign to each bookmark</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for Contents using their title, tl;dr or tags" className="max-w-[800px] p-3" />
      </div>
      {data === null ? null : data.length === 0 ? (
        <div className="mt-5 text-center text-xl text-muted">
          No contents found for "{searchQuery}"
        </div>
      ) : (
        <>
        <div className="py-5">
                <h1 className="text-xl font-bold">Showing results for <span className="text-primary">{searchQuery}</span> </h1>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
          <Masonry gutter="24px">
            {data.map((content : contentType) => (
              <ContentCard
                key={content._id}
                content={content}
                onClickHandler={() => setSelectedContent(content)}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
        </>
      )}
			<Modal
				isOpen={!!selectedContent}
				onClose={() => setSelectedContent(null)}
				className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[90%] lg:w-[80vw] lg:h-[80vh] max-w-screen max-h-screen overflow-scroll"
			>
				{selectedContent && <ContentModal content={selectedContent} />}
			</Modal> 
    </div>
  )
}

export default Search