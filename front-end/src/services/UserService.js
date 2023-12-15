import axios from "axios";

export const LoginUser = async (eml, pwd) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email: eml, password: pwd },
    );
}

export const RegisterUser = async (usrnm, eml, fnm, lnm, dtb, addr, typU, pwd) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/registration`, {
        username: usrnm, email: eml, firstname: fnm, lastname: lnm,
        dateofbirth: dtb, address: addr, usertype: typU, password: pwd
    },
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
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/users/get-user-by-email/` + GetEmail(), GetConfig());
}

export const UpdateUser = async (id, usrnm, eml, fnm, lnm, dtb, addr, typU, pwd) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/api/users/update/` + id, {
        userid: id, username: usrnm, email: eml, firstname: fnm, lastname: lnm,
        dateofbirth: dtb, address: addr, usertype: typU, password: pwd
    }, GetConfig()
    );
}

export const GetUsers = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/users/get-all`, GetConfig());
}

export const UpdateUserStatus = async (id, status) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/update-status`, { userid: id, status: status }, GetConfig());
}

export const UploadImageForUser = async (img, email) => {
    const formData = new FormData();
    formData.append('image', img);
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/users/upload-picture/` + email, formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    );
}

