import { Navigate } from "react-router";
// import { loginSuccess } from "../../features/auth/AuthSlice";
import { useSelector } from "react-redux";

function ProtectedRoutes({ children }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoutes