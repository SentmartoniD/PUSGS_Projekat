import axios from "axios";

export const LoginUser = async (email, pwd) => {
    return await axios.post(process.env.API_URL, JSON.stringify({ email: email, password: pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
}