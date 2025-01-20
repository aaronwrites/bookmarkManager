import { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { cn } from "../../lib/utils"

type NavItemProps = {
    children: ReactNode,
    to: string
}

const NavItem = ({ children, to } : NavItemProps) => {
  return (
    <NavLink to={to}>
        {({isActive}) => (
            <div className={cn("p-2 bg-primary bg-opacity-0 border-b-2 border-transparent hover:bg-opacity-10 hover:rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer",
                {
                    "bg-primary bg-opacity-10 rounded-lg border-primary" : isActive
                }
            )}>
                { children }
            </div>
            )}
    </NavLink>
  )
}

export default NavItem