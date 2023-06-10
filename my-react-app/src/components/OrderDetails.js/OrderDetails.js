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
        <div>
            <label>Comment : {order.comment}</label>
            <label>Address : {order.address}</label>
            <label>Order price : {order.price}</label>
            <ul>
                {order.articles &&
                    order.articles.map((article) => (
                        <li id={article.articleId} >
                            <h2>Name : {article.name}</h2>
                            <img width={120} height={120} src={`data:image/png;base64,${article.imageFile}`} ></img>
                            <p>{article.description}</p>
                            <label>Price: {article.price}</label>
                            <label>Available : {article.quantity}</label>
                            <label>Amount : {order.amountOfArticles[++i]}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}


export default OrderDetails;