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
            <div className={cn("p-2 hover:bg-primary hover:bg-opacity-15 hover:rounded-lg transition-all hover:shadow-md cursor-pointer",
                {
                    "bg-primary bg-opacity-15 rounded-lg" : isActive
                }
            )}>
                { children }
            </div>
            )}
    </NavLink>
  )
}

export default NavItem