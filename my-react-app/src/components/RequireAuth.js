import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet /> : <h1>Not authorized!</h1>
    )
};

export default RequireAuth;