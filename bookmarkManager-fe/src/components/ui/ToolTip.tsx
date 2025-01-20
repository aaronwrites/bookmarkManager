import { ReactNode } from "react"
import { cn } from "../../lib/utils"

type ToolTipTypes = {
    children: ReactNode,
    text: string,
    position?: "left" | "right" | "top" | "bottom"
}

const ToolTip = ({ children, position, text } : ToolTipTypes) => {
  return (
    <div className="relative group">
        {children}
        <div className={
            cn("bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                {
                    "absolute left-1/2 -translate-x-1/2 bottom-full mb-2" : position === "top",
                    "absolute left-1/2 -translate-x-1/2 top-full mt-2" : position === "bottom" || position === undefined,
                    "absolute left-full -translate-y-1/2 top-1/2 ml-2" : position === "right",
                    "absolute right-full -translate-y-1/2 top-1/2 mr-2" : position === "left"
                }
            )
            }>
            {text}
        </div>
    </div>
  )
}

export default ToolTip