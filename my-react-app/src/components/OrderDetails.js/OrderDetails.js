import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetOrderDetails } from "../../services/OrderService";



const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [counter, setCounter] = useState(0);
    const i = 0;//i++

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
            {order === [] ? null :
                <ul>
                    {order.articles.map((article) => (
                        <li id={article.articleId} >
                            <h2>{article.name}</h2>
                            <img width={120} height={120} ></img>
                            <p>{article.description}</p>
                            <label>Article price: {article.price}</label>
                            <label>Quantity : {article.quantity}</label>
                            <label>Amount ordered : {order.amountOfArticles[0]}</label>
                        </li>
                    ))}
                </ul>
            }

        </div>
    )
}


export default OrderDetails;