import { House, Tags, Search } from "lucide-react"
import NavItem from "./ui/NavItem"
import ToolTip from "./ui/ToolTip"

const Nav = ({ navPosition } : {
    navPosition: "top" | "bottom"
}) => {
  return (
    <nav className="relative flex justify-evenly items-center gap-10">
        <ToolTip position={navPosition === "top" ? "bottom" : "top"} text="Home">
            <NavItem to="/">
                <House color="#EF3B33" />
            </NavItem>
        </ToolTip>
        {/* <ToolTip position={navPosition === "top" ? "bottom" : "top"} text="Collections">
            <NavItem to="/collections">
                <LayoutGrid color="#EF3B33" />
            </NavItem>
        </ToolTip> */}
        <ToolTip position={navPosition === "top" ? "bottom" : "top"} text="Tags">
            <NavItem to="/tags">
                <Tags color="#EF3B33"/>
            </NavItem>
        </ToolTip>
        <ToolTip position={navPosition === "top" ? "bottom" : "top"} text="Search">
            <NavItem to="/search">
                <Search color="#EF3B33"/>
            </NavItem>
        </ToolTip>
    </nav>
  )
}

export default Nav