import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
// import Collections from "./pages/Collections"
import TagManagement from "./pages/TagManagement"
import Search from "./pages/Search"
import AppLayout from "./layouts/AppLayout"
import ProtectedRoute from "./layouts/ProtectedRoute"
import ContentsByTag from "./pages/ContentsByTag"
import Share from "./pages/Share"
import InvalidRoute from "./pages/InvalidRoute"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              {/* <Route path="/collections" element={<Collections />} /> */}
              <Route path="/tags" element={<TagManagement />} />
              <Route path="/tag/:tagId" element={<ContentsByTag />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>
          <Route path="/share/:hash" element={<Share />} />
          <Route path={"/auth"} element={<AuthLayout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<InvalidRoute />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App