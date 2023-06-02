import axios from "axios";

export const LoginUser = async (eml, pwd) => {
    return await axios.post('https://localhost:44368/api/users/login', { email: eml, password: pwd },
        /* {
             headers: { 'Content-Type': 'application/json' },
             withCredentials: true
         }*/
    );
}

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

export const GetConfig = () => {
    return {
        headers: {
            "Authorization": `Bearer ${GetToken()}`
        }
    }
}

export const GetEmail = () => {
    return localStorage.getItem('email');
}

export const GetRegisteredUser = async () => {
    return await axios.get('https://localhost:44368/api/users/get-user-by-email/' + GetEmail(), GetConfig());
}

export const UpdateUser = async (id, usrnm, eml, fnm, lnm, dtb, addr, typU, img, pwd) => {
    return await axios.put('https://localhost:44368/api/users/update/' + id, {
        userid: id, username: usrnm, email: eml, firstname: fnm, lastname: lnm,
        dateofbirth: dtb, address: addr, usertype: typU, image: img, password: pwd
    }, GetConfig()
    );
}

export const GetUsers = async () => {
    return await axios.get('https://localhost:44368/api/users/get-all', GetConfig());
}

export const UpdateUserStatus = async (id, status) => {
    return await axios.post('https://localhost:44368/api/users/update-status', { userid: id, status: status }, GetConfig());
}

