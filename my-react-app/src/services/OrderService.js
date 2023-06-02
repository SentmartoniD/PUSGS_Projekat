import axios from "axios";

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

export const CreateOrder = async (cmnt, addr, prc, ids, amounts) => {
    return await axios.post('https://localhost:44368/api/orders/' + GetEmail(), { comment: cmnt, address: addr, price: prc, articleIds: ids, amountOfArticles: amounts }, GetConfig());
}

export const GetAllOrders = async () => {
    return await axios.get('https://localhost:44368/api/orders', GetConfig());
}