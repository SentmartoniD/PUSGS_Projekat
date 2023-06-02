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
/*
export const GetArticleIds = () => {
    const articles =
    return localStorage.getItem('email');
}*/

export const CreateArticle = async (nm, prc, quant, desc, img) => {
    return await axios.post('https://localhost:44368/api/articles/add/' + GetEmail(), { name: nm, price: prc, quantity: quant, description: desc, image: img }, GetConfig());
}

export const GetArticles = async () => {
    return await axios.get('https://localhost:44368/api/articles', GetConfig());
}

export const GetArticlesByEmail = async () => {
    return await axios.get('https://localhost:44368/api/articles/get-articles-by-email/' + GetEmail(), GetConfig());
}

export const GetArticlesForCart = async () => {
    return await axios.post('https://localhost:44368/api/articles/get-articles-for-cart', JSON.parse(localStorage.getItem("articles")), GetConfig());
}

export const DeleteArticle = async (articleId) => {
    return await axios.delete('https://localhost:44368/api/articles/delete/' + articleId, GetConfig());
}

export const UpdateArticle = async (id, nm, prc, quant, desc, img) => {
    return await axios.patch('https://localhost:44368/api/articles/update', {
        articleID: id, name: nm, price: prc, quantity: quant, description: desc, image: img
    }, GetConfig()
    );
}