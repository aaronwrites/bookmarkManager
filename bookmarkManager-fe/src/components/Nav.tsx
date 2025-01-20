import { House, LayoutGrid, Tags, Search } from "lucide-react"
import NavItem from "./ui/NavItem"
import ToolTip from "./ui/ToolTip"

const Nav = () => {
  return (
    <nav className="relative flex items-center gap-10">
        <ToolTip text="Home">
            <NavItem to="/home">
                <House color="#EF3B33" />
            </NavItem>
        </ToolTip>
        <NavItem to="/collections">
            <LayoutGrid color="#EF3B33" />
        </NavItem>
        <NavItem to="/tags">
            <Tags color="#EF3B33"/>
        </NavItem>
        <NavItem to="/search">
            <Search color="#EF3B33"/>
        </NavItem>
    </nav>
  )
}

export default Nav