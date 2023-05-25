import { useNavigate } from "react-router-dom";
import { useState } from "react";






function MyCart() {
    const [articles, setArticles] = useState([]);
    const [comment, setComment] = useState("");
    const [address, setAddress] = useState("");

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
        //meg kell valahogy hogy jelentsem hogy uritse ki az ul-t
    }

    const handleOrder = async () => {
        //kell a post
        alert("Successfully made the order!")
        navigateToArticleList();
    }

    return (
        <section>
            <ul>

            </ul>
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