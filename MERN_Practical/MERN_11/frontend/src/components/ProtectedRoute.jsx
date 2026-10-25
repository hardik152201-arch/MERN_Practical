
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // If user is not logged in
    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );
    }

    // User is authenticated
    return children;
};

export default ProtectedRoute;
