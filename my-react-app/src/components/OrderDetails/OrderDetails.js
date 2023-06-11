import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetOrderDetails } from "../../services/OrderService";



const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [counter, setCounter] = useState(0);
    var i = -1;//i++

    useEffect(() => {
        const GetOrder = async () => {
            try {
                const resp = await GetOrderDetails(id.substring(1));
                console.log(resp.data);
                setOrder(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting order failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetOrder();
    }, [])

    return (
        <section className="section-details" >
            <div className="div-details" >
                <label>Comment : {order.comment}</label>
                <label>Address : {order.address}</label>
                <label>Order price : {order.price}</label>
            </div>
            <ul className="ul-items-allorders" >
                {order.articles &&
                    order.articles.map((article) => (
                        <li id={article.articleId} className="item-details" >
                            <h2 style={{ color: 'white' }} >{article.name}</h2>
                            <img style={{ border: '2px solid white' }} width={120} height={120} src={`data:image/png;base64,${article.imageFile}`} ></img>
                            <label>Description : {article.description}</label>
                            <label>Price: {article.price}</label>
                            <label>Available : {article.quantity}</label>
                            <label>Amount ordered : {order.amountOfArticles[++i]}</label>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}


export default OrderDetails;