import { House, LayoutGrid, Tags, Search } from "lucide-react"
import NavItem from "./NavItem"

const Nav = () => {
  return (
    <nav className="relative flex items-center gap-10">
        <NavItem to="/home">
            <House color="#EF3B33" />
        </NavItem>
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