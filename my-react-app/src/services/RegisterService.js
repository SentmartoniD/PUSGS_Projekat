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

export const GetToken = () => {
    return localStorage.getItem('token');
}

const config = {
    headers: {
        "Authorization": `Bearer ${GetToken()}`
    }
}

export const GetEmail = () => {
    return localStorage.getItem('email');
}

export const GetRegisteredUser = async () => {
    return await axios.get('https://localhost:44368/api/users/get-user-by-email/' + GetEmail(), config);
}


