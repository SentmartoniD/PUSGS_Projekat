import axios from "axios";

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

export const CreateArticle = async (nm, prc, quant, desc, img) => {
    return await axios.post('https://localhost:44368/api/articles/add/' + GetEmail(), { name: nm, price: prc, quantity: quant, description: desc, image: img }, config);
}

export const GetArticles = async () => {
    return await axios.get('https://localhost:44368/api/articles/get-articles-by-email/' + GetEmail(), config);
}

export const DeleteArticle = async (articleId) => {
    return await axios.delete('https://localhost:44368/api/articles/delete/' + articleId, config);
}

export const UpdateArticle = async (id, nm, prc, quant, desc, img) => {
    return await axios.patch('https://localhost:44368/api/articles/update', {
        articleID: id, name: nm, price: prc, quantity: quant, description: desc, image: img
    }, config
    );
}