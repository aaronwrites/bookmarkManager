import { House, LayoutGrid, Tags, Search } from "lucide-react"

const Nav = () => {
  return (
    <nav className="relative flex items-center gap-10">
        <div className="p-3 hover:bg-primary hover:bg-opacity-15 hover:rounded-full transition-all hover:shadow-md hover:scale-110">
            <House color="#EF3B33" />
        </div>
        <div className="p-3 bg-primary bg-opacity-20 rounded-full">
            <LayoutGrid color="#EF3B33" />
        </div>
        <div>
            <Tags color="#EF3B33"/>
        </div>
        <div>
            <Search color="#EF3B33"/>
        </div>
    </nav>
  )
}

export default Nav