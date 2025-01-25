import { useQuery } from "@tanstack/react-query"
import { getAllContents } from "../services/contentService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { contentType } from "../types/contentTypes";
import ContentCard from "../components/ui/ContentCard";
import { useState } from "react";
import Modal from "../components/ui/Modal";
import ContentModal from "../components/ContentModal";


const Home = () => {

  const [selectedContent, setSelectedContent] = useState<contentType | null>(null);

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["content"],
    queryFn: getAllContents
  })

  if(isPending) {
    return <div>Loading...</div>
  }

  if(isError) {
    console.log(error);
    return <div>Error fetching...</div>
  }

  return (
    <div className="min-h-screen p-5">
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
      >
        <Masonry gutter="24px">
          {data?.content.map((content : contentType) => (
            <ContentCard
              key={content._id}
              content={content}
              onClickHandler={() => setSelectedContent(content)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <Modal isOpen={!!selectedContent} onClose={() => setSelectedContent(null)} className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[90%] lg:w-[80vw] lg:h-[80vh] max-w-screen max-h-screen overflow-scroll" >
        {selectedContent && <ContentModal content={selectedContent} />}
      </Modal>
    </div>

  )
}

export default Home