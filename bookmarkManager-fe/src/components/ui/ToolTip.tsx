import { ReactNode } from "react"

type ToolTipTypes = {
    children: ReactNode,
    text: string,
}

const ToolTip = ({ children, text } : ToolTipTypes) => {
  return (
    <div className="relative group">
        {children}
        <div className="absolute bg-gray-800 text-white text-xs left-1/2 top-full -translate-x-1/2 rounded-md px-2 py-1 mt-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {text}
        </div>
    </div>
  )
}

export default ToolTip