import { Outlet } from "react-router-dom";
//import jwt from 'jsonwebtoken';
/*
function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const userRole = payloadObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    return (
        allowedRoles?.includes(userRole) ? <Outlet /> : <h1 className="h1-register-profile" >Not authorized!</h1>//IDE KELL MEG HOZAADNI HA USER BENNA VAN A TOMBEN AKKOR MEG KELL NEZNI HOGY VERIFIKALT-E, vagy csak rakok sok ifet
    )
}

export default ProtectedRoute;*/

function ProtectedRoute({ allowedRoles, type }) {
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const userRole = payloadObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const verified = payloadObj["verified"];
    return (
        !allowedRoles?.includes(userRole) ? <h1 className="h1-register-profile" >Not authorized!</h1> : userRole === "seller" && verified === "False" && type === "profile" ? <Outlet /> :
            userRole === "seller" && verified === "False" && (type === "my" || type === "new" || type === "articles") ? <h1 className="h1-register-profile" >Not verified!</h1> : <Outlet />
    )
}

export default ProtectedRoute;