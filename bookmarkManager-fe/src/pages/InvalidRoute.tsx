import { Logo } from "../assets/Logo"

const InvalidRoute = () => {
  return (
    <div className="min-h-screen p-5 mb-10 relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[300px] lg:w-[1000px] lg:h-[1000px] bg-[#ef3b33] opacity-25 blur-[100px] rounded-full"></div>
                <header className="flex justify-center py-10">
                    <Logo />
                </header>
            <div className="h-screen flex justify-center items-center">
                <p className="text-xl text-muted font-bold">Error 404. Page Not Found</p>
            </div>
    </div>
  )
}

export default InvalidRoute