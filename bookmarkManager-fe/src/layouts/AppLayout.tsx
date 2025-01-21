import { Outlet } from "react-router-dom"
import Header from "../components/ui/Header"
const AppLayout = () => {
  return (
    <div className="h-full w-full flex flex-col bg-background">
        <Header />
        <main className="flex-1 overflow-y-auto">
        <Outlet />
        </main>
    </div>
  )
}

export default AppLayout
