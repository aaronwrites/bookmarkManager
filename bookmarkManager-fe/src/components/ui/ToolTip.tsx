import { ReactNode } from "react"

type ToolTipTypes = {
    children: ReactNode,
    text: string,
}

const ToolTip = ({ children, text } : ToolTipTypes) => {
  return (
    <div className="relative group">
        {children}
        <div className="absolute bg-gray-800 text-white text-xs hidden group-hover:block left-1/2 top-full -translate-x-1/2 rounded-md px-2 py-1 mt-2 z-10">
            {text}
        </div>
    </div>
  )
}

export default ToolTip