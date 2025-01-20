import { Logo } from "../../assets/Logo"
import Avatar from "./Avatar"
import Nav from "./Nav"

const Header = () => {
  return (
    <header className="bg-background flex justify-between items-center fixed top-0 w-full py-3 px-5 shadow-md">
        <Logo />
        <Nav />
        <Avatar />
    </header>
  )
}

export default Header