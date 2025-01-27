import { Trash2, ExternalLink, Maximize2 } from "lucide-react"
import fallbackImg from "../../assets/image.png"
import { contentType } from "../../types/contentTypes"
import { Tweet } from "react-tweet"
import { usePreview } from "../../hooks/usePreview"
import LoadingCard from "./LoadingCard"
import { deleteContent } from "../../services/contentService"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Modal from "./Modal"
import DeleteContentModal from "../DeleteContentModal"

type ContentCardProps = {
  content: contentType,
  onClickHandler: () => void
}

const ContentCard = ({content, onClickHandler} : ContentCardProps) => {
  const { data , isError, isTweet, isPending } = usePreview(content.link);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  
  const cardTitle = content.title || data?.title || content.link;

  const { mutate: deleteAContent } = useMutation ({
    mutationFn: (contentId : string) => deleteContent(contentId),
    onSuccess: () => {
      toast.success('Content deleted successfully');
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      toast.error('Failed to add content');
      console.error('Error creating content:', error);
    },
  });

  if(isPending) {
    return <LoadingCard />
  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="rounded-xl sm:rounded-lg lg:rounded-2xl w-[90%] h-[70%] lg:w-[30vw] lg:h-[30vh] max-w-[500px] max-h-[500px]">
        <DeleteContentModal onClose={() => setIsOpen(false)} deleteContent={() => deleteAContent(content._id)} />
      </Modal>
      <div className="flex flex-col h-auto justify-center items-center group gap-2 cursor-pointer m-1.5 w-full" onClick={onClickHandler}>
        <div className="relative grow self-stretch">
          <div className="relative h-full rounded-xl flex flex-col shadow-xl overflow-hidden" data-theme="light">
            {isTweet ? (
                <Tweet id={content.link.split("/status/")[1]} />
              ) : (
                <img
                  src={isError ? fallbackImg : data?.image || fallbackImg}
                  alt="Preview"
                  className="w-full object-center"
                />
              )}
            <div className="absolute inset-0 w-full h-full bg-black opacity-0 backdrop-blur-sm bg-opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 p-4 transition-opacity duration-300 ease-in-out">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="text-white">
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium truncate">{cardTitle}</p>
                    <button className="rounded-full bg-red-500 hover:bg-red-600 p-1.5" onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true)
                    }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-white/80 self-center tracking-wider flex items-center gap-2 font-bold">
                  Click to expand
                  <Maximize2 size={18} />
                </div>
                <div className="text-white flex justify-end w-full">
                    <div className="flex items-center gap-2 text-sm px-2 py-1 bg-black backdrop-blur-lg bg-opacity-30 rounded-full border border-gray-200 border-opacity-30 max-w-56" onClick={(e) => e.stopPropagation()}>
                      <div className="truncate hover:underline"><a href={content.link}>{content.link}</a></div>
                      <div>
                        <ExternalLink size={16} />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-sm text-muted px-3">
          {cardTitle}
        </div>
      </div>
    </>
  )
}

export default ContentCard