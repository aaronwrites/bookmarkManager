import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Collections from "./pages/Collections"
import TagManagement from "./pages/TagManagement"
import Search from "./pages/Search"
import AppLayout from "./layouts/AppLayout"
import ProtectedRoute from "./layouts/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/tags" element={<TagManagement />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>
          <Route path={"/auth"} element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App