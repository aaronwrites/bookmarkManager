import { Bookmark } from "lucide-react"
import Button from "./ui/Button"
import { Input } from "./ui/Input"
import { useState } from "react"
import toast from "react-hot-toast"

type AddContentModal = {
  addContent: (link : string) => void,
  closeFn: () => void
}


const AddContentModal = ({ addContent, closeFn } : AddContentModal) => {
  const [link, setLink] = useState("");

  const handleAddContent = () => {
    if (!link || !link.includes("http")) {
      toast.error("Please enter a valid link"); 
      return;
    }
    addContent(link);
    setLink(""); 
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4 w-full h-full">
        <div className="text-red-500 flex flex-col items-center gap-2 w-full px-4">
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">Add a BookMark</p>
              <Bookmark />
            </div>
            <label className="text-muted text-md">Link:</label>
            <Input type="text" value={link} placeholder="Enter or paste a link here" onChange={(e) => setLink(e.target.value)} className="w-full" />
        </div>
        <div className="flex justify-center items-center gap-10">
            <Button variant={"outline"} className="bg-red-500 text-white w-full" onClick={() => { 
              handleAddContent();
              closeFn();
            }}>Add Bookmark</Button>
        </div>
    </div>
  )
}

export default AddContentModal