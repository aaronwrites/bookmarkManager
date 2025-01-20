import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import Header from "./components/ui/Header"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path={"/auth"} element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App