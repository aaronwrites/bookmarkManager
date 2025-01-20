import { Logo } from "../../assets/Logo"
import Avatar from "./Avatar"
import Nav from "../Nav"

const Header = () => {
  return (
    <header className="bg-background flex justify-between items-center sticky top-0 w-full py-3 px-5 shadow-md">
        <Logo />
        <div className="hidden lg:block">
          <Nav navPosition="top" />
        </div>
        <div className="fixed bottom-0 lg:hidden left-0 w-full py-3 px-5 z-10 bg-background shadow-xl">
          <Nav navPosition="bottom" />
        </div>
        <Avatar />
    </header>
  )
}

export default Header