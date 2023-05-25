import Article from "../Article/Article";
import { useEffect, useState } from "react";
import { GetArticles } from "../../services/ArticleService";
import { useNavigate } from "react-router-dom";

function AricleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const GetAllArticles = async () => {
            try {
                const resp = await GetArticles();
                console.log(resp.data);
                setArticles(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting articles failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetAllArticles();
    }, [])

    const navigate = useNavigate()
    const navigateToMyCart = () => {
        navigate('/home/my-cart');
    };

    const handleMyCart = async () => {
        navigateToMyCart();
    }

    return (
        <>
            <button className="button-my-cart" onClick={handleMyCart} >My Cart</button>
            <section className="article-list">
                {articles.map((article) => (
                    <Article name={article.name} description={article.description} price={article.price} quantity={article.quantity} articleId={article.articleId} />
                ))
                }
            </section>
        </>
    )
};

export default AricleList;
