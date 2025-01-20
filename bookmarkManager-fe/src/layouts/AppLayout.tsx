import { Outlet } from "react-router-dom"
import Header from "../components/ui/Header"
const AppLayout = () => {
  return (
    <div className="h-screen w-full bg-background">
        <Header />
        <Outlet />
    </div>
  )
}

export default AppLayout
