import axios from "axios";

export const LoginUser = async (eml, pwd) => {
    return await axios.post('https://localhost:44368/api/users/login', { email: eml, password: pwd },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
}