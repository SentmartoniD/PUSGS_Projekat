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

export const CreateArticle = async (nm, prc, quant, desc) => {
    return await axios.post('https://localhost:44368/api/articles/add/' + GetEmail(), { name: nm, price: prc, quantity: quant, description: desc }, GetConfig());
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

export const UpdateArticle = async (id, nm, prc, quant, desc) => {
    return await axios.patch('https://localhost:44368/api/articles/update', {
        articleID: id, name: nm, price: prc, quantity: quant, description: desc
    }, GetConfig()
    );
}

export const UploadImageForArticle = async (img, id) => {
    const formData = new FormData();
    formData.append('image', img);
    return await axios.post('https://localhost:44368/api/articles/upload-picture/' + id, formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    );
}