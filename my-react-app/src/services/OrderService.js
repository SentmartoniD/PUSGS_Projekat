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

export const GetAllOrdersForAdmin = async () => {
    return await axios.get('https://localhost:44368/api/orders', GetConfig());
}

export const GetAllOrdersForBuyer = async () => {
    return await axios.get('https://localhost:44368/api/orders/all-orders-for-buyer/' + GetEmail(), GetConfig());
}

export const GetAllCurrentOrdersForSeller = async () => {
    return await axios.get('https://localhost:44368/api/orders/all-current-orders-for-seller/' + GetEmail(), GetConfig());
}

export const GetAllPastOrdersForSeller = async () => {
    return await axios.get('https://localhost:44368/api/orders/all-past-orders-for-seller/' + GetEmail(), GetConfig());
}

export const CancelOrder = async (id) => {
    return await axios.delete('https://localhost:44368/api/orders/cancel-order/' + id, GetConfig());
}
/*
export const GetOrderDetails = async (id) => {
    return await axios.get('https://localhost:44368/api/orders/order-details', {
        params: {
            parameter1: id,
            parameter2: GetEmail()
        }, ...GetConfig()
    });
}*/
export const GetOrderDetails = async (id) => {
    return await axios.get('https://localhost:44368/api/orders/order-details/' + id + "/" + GetEmail(), GetConfig());
}