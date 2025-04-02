import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "./reduxHooks";
import { useEffect } from "react";

// хук для того, что бы пользователя перекидывало на авторизацию, если он еще не зарегистрирован
const useIsAuth = () => {
    const user = useAppSelector(u => u.user._id);
    console.log('user', user)
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log('навиг', pathname)
    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/registration' && !user) {
            console.log('переправляем');
            navigate('/login');
        }
    }, [user, pathname, navigate]); 
};

export default useIsAuth;