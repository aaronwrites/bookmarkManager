import { ReactNode } from "react"
import { cn } from "../../lib/utils"
import { X } from "lucide-react"

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    className?: string
}

const Modal = ({ isOpen, onClose, children, className } : ModalProps) => {
  return (
    <div className={cn("fixed inset-0 bg-black/40 z-50 hidden justify-center items-center backdrop-blur-sm", isOpen && "flex")} onClick={onClose}>
        <div className={cn("relative bg-white rounded-lg p-10", className)} onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3" onClick={onClose}>
                <X className="text-primary" />
            </button>
            {children}
        </div>
    </div>
  )
}

export default Modal