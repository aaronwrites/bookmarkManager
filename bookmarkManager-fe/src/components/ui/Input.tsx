import { cn } from "../../lib/utils"

const Input = ({ className, type, ...props } : React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type={type} className={cn("text-sm w-full border border-input p-2 rounded-lg outline-primary caret-primary placeholder:text-sm", className)} {...props} />
  )
}

export { Input }