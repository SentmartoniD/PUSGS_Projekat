import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return <AuthProvider.AuthContext value={{ auth, setAuth }}>
        {children}
    </AuthProvider.AuthContext>
}

export default AuthContext;