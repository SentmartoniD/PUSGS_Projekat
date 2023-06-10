import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetArticlesForCart } from "../../services/ArticleService";
import { CreateOrder } from "../../services/OrderService";

const DELIVERY_PRICE = 1000;



function MyCart() {
    const [articles, setArticles] = useState([]);
    const [comment, setComment] = useState("");
    const [address, setAddress] = useState("");
    const [amounts, setAmounts] = useState([]);
    const [ids, setIds] = useState([]);

    const navigate = useNavigate()
    const navigateToArticleList = () => {
        navigate('/home/article-list');
    };

    const handleBackToArticleList = async () => {
        navigateToArticleList();
    }

    const handleClearMyCart = async () => {
        localStorage.setItem("articles", JSON.stringify([]));
        setArticles([]);
    }

    const handleOrder = async () => {
        var plsprice = 0
        if (articles.length === 0) {
            alert("Your cart is empty!");
            navigateToArticleList();
        }
        if (comment === "" || address === "") {
            alert("You must type a comment and an address!")
            return;
        }
        try {
            articles.forEach((article) => {
                ids.push(article.articleId);
                const mnt = document.getElementById(article.articleId + "amount").value;
                amounts.push(mnt);
                plsprice = plsprice + (mnt * article.price);
            });
            plsprice = plsprice + getDeliverPrice();
            const resp = await CreateOrder(comment, address, plsprice, ids, amounts);
            alert("Successfully made the order!")
            localStorage.setItem("articles", JSON.stringify([]));
            setArticles([]);
            navigateToArticleList();
        } catch (err) {
            if (!err?.response)
                alert("No server response, creating order failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
    }

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("articles")))
        const GetAllArticles = async () => {
            try {
                const resp = await GetArticlesForCart();
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

    const getDeliverPrice = () => {
        const array = [];
        if (articles.length != 0) {
            articles.map((article) => (
                array.includes(article.userSeller.userId) ? null : array.push(article.userSeller.userId)
            ))
        }
        return array.length * DELIVERY_PRICE;
    }

    return (
        <section className="section-mycart" >
            {
                articles.length === 0 ? <></> :
                    <ul className="ul-items-mycart" >
                        {
                            articles.map((article) => (
                                <li id={article.articleId} className="item-mycart" >
                                    <article className="article-mycart" >
                                        <h2>{article.name}</h2>
                                        <img width={100} height={100} src={`data:image/png;base64,${article.imageFile}`} ></img>
                                        <p>{article.description}</p>
                                        <label id={article.articleId + "price"} >Price: {article.price}</label>
                                        <label>Available : {article.quantity}</label>
                                        <label>Seller username : {article.userSeller.username}</label>
                                        <label>Seller email : {article.userSeller.email}</label>
                                        <div>
                                            <label>Quantity</label>
                                            <input id={article.articleId + "amount"} type="number" min={1} defaultValue={1} step={1} max={article.quantity}></input>
                                        </div>
                                    </article>
                                </li>
                            ))
                        }
                    </ul>
            }
            <div className="div-control-mycart" >
                <label>Total amount : {233244}(din)</label>
                <label>Comment :</label>
                <input className="input-mycart" type="text" onChange={(e) => setComment(e.target.value)} ></input>
                <label>Address :</label>
                <input className="input-mycart" type="text" onChange={(e) => setAddress(e.target.value)} ></input>
            </div>
            <div className="div-container-mycart" >
                <button className="button-mycart" onClick={handleOrder} >ORDER!</button>
                <button className="button-mycart" onClick={handleClearMyCart} >CLEAR MY CART!</button>
                <button className="button-mycart" onClick={handleBackToArticleList} >BACK TO ARTICLE LIST!</button>
            </div>
        </section>
    )
}


export default MyCart;