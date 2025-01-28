import { Trash2 } from "lucide-react"
import Button from "./ui/Button"

type DeleteModalProps = {
    onClose: () => void;
    deleteContent: () => void;
  };

const DeleteContentModal = ({ onClose, deleteContent } : DeleteModalProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4 w-full h-full">
        <div className="text-red-500 flex flex-col justify-center items-center gap-2">
            <Trash2 className="text-xl" />
            <p className="text-xl font-medium">Delete Bookmark?</p>
            <p className="text-muted text-md">This action cannot be undone </p>
        </div>
        <div className="flex justify-center items-center gap-10">
            <Button variant={"outline"} className="text-red-500" onClick={onClose}>Cancel</Button>
            <Button variant={"outline"} className="bg-red-500 text-white" onClick={deleteContent}>Delete</Button>
        </div>
    </div>
  )
}

export default DeleteContentModal