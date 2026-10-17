import {Navigate, Outlet} from 'react-router-dom';
import {useApp} from '../context/useApp';

const PublicRoute=()=>{
    const {isAuth, loading} = useApp();

    if(loading){
        return null;
    }

    return isAuth ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;