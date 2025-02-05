import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContent, getAllContents } from "../services/contentService";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { contentType } from "../types/contentTypes";
import ContentCard from "../components/ui/ContentCard";
import { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import ContentModal from "../components/ContentModal";
import { Bookmark, Command, Plus, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import AddContentModal from "../components/AddContentModal";
import Button from "../components/ui/Button";


const Home = () => {

  const [selectedContent, setSelectedContent] = useState<contentType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handlePaste = (e : ClipboardEvent ) => {
      
      const clipboardData = e.clipboardData;
      if(clipboardData) {
        const pastedLink = clipboardData.getData('Text');
        if(isOpen || selectedContent ) {
          return;
        }
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
  }, [isOpen, selectedContent]);

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
    return (<div className="min-h-screen flex justify-center items-center">
            <p className="text-xl text-muted font-bold">Loading Contents...</p>
    </div>)
  }

  if(isError) {
    console.log(error);
    return (<div className="min-h-screen flex justify-center items-center">
      <p className="text-xl text-muted font-bold">Error Fetching Contents. Please Try Again Later</p>
  </div>)
  }


  return (
    <div className="min-h-screen p-5 mb-10">
      <div className="mb-8 p-2 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className=" text-xl lg:text-3xl font-bold text-primary flex items-center gap-3">
            All Bookmarks
            <Bookmark size={30} />
          </h2>
          <p className="text-muted items-center hidden xl:flex">Click on a card to expand. To add a bookmark simply copy the url of any site and press Ctrl + V or  <Command className="ml-1" /> + V here to paste. As simple as that :)  </p>
        </div>
        <div className="hidden lg:flex items-center gap-2">
            <div className="flex-shrink-0">
              <Button variant={"outline"} onClick={() => console.log("share triggered")}>Share Your Vault <Share2 /> </Button>
            </div>
            <div className="flex-shrink-0">
              <Button onClick={() => setIsOpen(true)}>Add Bookmark <Plus /> </Button>
            </div>
        </div>
        <div className="flex lg:hidden items-center gap-2">
            <div className="flex-shrink-0">
              <Button variant={"outline"} size={"sm"} onClick={() => console.log("share triggered")}>Share Your Vault <Share2 /> </Button>
            </div>
            <div className="flex-shrink-0">
              <Button size={"sm"} onClick={() => setIsOpen(true)}>Add Bookmark <Plus /> </Button>
            </div>
        </div>
      </div>
      <Modal isOpen={!!selectedContent} onClose={() => setSelectedContent(null)} className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[90%] lg:w-[80vw] lg:h-[80vh] max-w-screen max-h-screen overflow-scroll" >
        {selectedContent && <ContentModal content={selectedContent} />}
      </Modal>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[70%] lg:w-[30vw] lg:h-[30vh] max-w-[500px] max-h-[500px]" >
        <AddContentModal addContent={(link) => postContent(link)} closeFn={() => setIsOpen(false)} />
      </Modal>

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
    </div>

  )
}

export default Home