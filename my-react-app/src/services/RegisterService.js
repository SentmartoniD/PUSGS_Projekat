import axios from "axios";

export const RegisterUser = async (usrnm, eml, fnm, lnm, dtb, addr, img, pwd) => {
    return await axios.post(`${process.env.API_URL}/api/users`, { username: usrnm, email: eml, firstname: fnm, lastname: lnm, dateofbirth: dtb, address: addr, image: img, password: pwd },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
}
