import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoute = () => {
    const authToken = localStorage.getItem("token");
    
    return (
        authToken ? <Outlet /> : <Navigate to={"/auth/signin"} />
    )
}

export default ProtectedRoute