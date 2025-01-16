import { Outlet } from "react-router-dom"
import { Logo } from "../assets/Logo"
const AuthLayout = () => {
  return (
    <div className="h-screen w-full bg-background relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
        <header className="flex justify-center py-10">
            <Logo />
        </header>
        <main className="w-full flex justify-center">
            <Outlet />
        </main>
    </div>
  )
}

export default AuthLayout
