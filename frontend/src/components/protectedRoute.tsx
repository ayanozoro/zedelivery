import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/useApp";

const ProtectedRoute = () => {
    const { isAuth, user, loading } = useApp();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if(!isAuth){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(user?.role == null && location.pathname !== "/select-role"){
        return <Navigate to="/select-role" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;