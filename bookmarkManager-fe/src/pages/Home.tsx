import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContent, getAllContents } from "../services/contentService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { contentType } from "../types/contentTypes";
import ContentCard from "../components/ui/ContentCard";
import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import ContentModal from "../components/ContentModal";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";


const Home = () => {

  const [selectedContent, setSelectedContent] = useState<contentType | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handlePaste = (e : ClipboardEvent ) => {
      const clipboardData = e.clipboardData;
      if(clipboardData) {
        const pastedLink = clipboardData.getData('Text');
        if (isValidUrl(pastedLink)) {
          postContent(pastedLink);
        } else {
          toast.error('Invalid URL pasted');
        }
      }
    };
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["content"],
    queryFn: getAllContents
  })

  const { mutate: postContent } = useMutation({
    mutationFn: (link : string) => createContent(link),
    onSuccess: () => {
      toast.success('Content added successfully');
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      toast.error('Failed to add content');
      console.error('Error creating content:', error);
    },
  });

  const isValidUrl = (url : string) => {
    return url.includes("http")
  }

  if(isPending) {
    return <div>Loading...</div>
  }

  if(isError) {
    console.log(error);
    return <div>Error fetching...</div>
  }


  return (
    <div className="min-h-screen p-5">
      <div className="mb-8 p-2 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
          All Bookmarks
          <Bookmark size={30} />
        </h2>
        <p className="text-muted">View all your bookmarks. Click on a card to expand</p>
      </div>
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