import React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(["rounded-md", "inline-flex", "justify-center", "items-center", "transition-colors"],{
    variants: {
        variant: {
            primary: "text-white bg-primary hover:bg-primary/90",
            outline: "text-primary border border-primary hover:bg-primary/90 hover:text-white",
            ghost: " text-primary hover:bg-primary hover:text-white"
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8"
        },
        disabled: {
          false: null,
          true: ["opacity-50", "cursor-not-allowed"],
        },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    }
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  disabled?: boolean
}

const Button = ({ variant, size, disabled, className, ...props } : ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ variant, size, disabled, className }))} {...props} />
  )
}

export default Button