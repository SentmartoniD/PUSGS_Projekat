import axios from "axios";
/*
export const RegisterUser = async (usrnm, eml, fnm, lnm, dtb, addr, typU, img, pwd) => {
    return await axios.post(`${process.env.API_URL}/api/users/registration`, JSON.stringify({
        username: usrnm, email: eml, firstname: fnm, lastname: lnm,
        dateofbirth: dtb, address: addr, usertype: typU, image: img, password: pwd
    }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
}*/

export const RegisterUser = async (usrnm, eml, fnm, lnm, dtb, addr, typU, img, pwd) => {
    return await axios.post('https://localhost:44368/api/users/registration', {
        username: usrnm, email: eml, firstname: fnm, lastname: lnm,
        dateofbirth: dtb, address: addr, usertype: typU, image: img, password: pwd
    },/*
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }*/
    );
}




