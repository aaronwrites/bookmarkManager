
const Input = ({ className, type, ...props } : React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type={type} className="text-sm w-full border border-input p-2 rounded-lg outline-primary caret-primary placeholder:text-sm" {...props} />
  )
}

export { Input }