import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllOrdersForAdmin, GetAllCurrentOrdersForSeller, GetAllPastOrdersForSeller } from "../../services/OrderService";
import CountdownTimer from "../CountdownTimer";



const Orders = (props) => {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    const navigateToOrderDetails = (oId) => {
        navigate('order-details/:' + oId);
    };

    useEffect(() => {
        const GetOrders = async () => {
            try {
                //const resp = null;
                if (props.userType === "admin") {
                    const resp = await GetAllOrdersForAdmin();
                    console.log(resp.data);
                    setOrders(resp.data);
                }
                else if (props.userType === "seller-new") {
                    const resp = await GetAllCurrentOrdersForSeller();
                    console.log(resp.data);
                    setOrders(resp.data);
                }
                else if (props.userType === "seller-my") {
                    const resp = await GetAllPastOrdersForSeller();
                    console.log(resp.data);
                    setOrders(resp.data);
                }
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting articles failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetOrders();
    }, [props.userType])

    const getTime = (dateOfOrder) => {
        const date = new Date(dateOfOrder);
        date.setMinutes(date.getMinutes() + 2);
        const currentTime = new Date();
        return Math.floor((date - currentTime) / 1000);
    };

    const handleDetails = (oId) => {
        navigateToOrderDetails(oId);
    }

    return (
        <section className="section-allorders" >
            <h1 className="h1-allorders" >Orders!</h1>
            {
                orders.length === 0 ? <></> :
                    <ul className="ul-items-allorders" >
                        {orders.map((order) => (
                            <li id={order.orderId} className="item-allorders" >
                                <label>Adrress : {order.address}</label>
                                <label>Comment : {order.comment}</label>
                                <label>Price : {order.price}</label>
                                {props.userType === "admin" ? <label>Delivery state : {order.dateOfOrder === "canceled" ? "Canceled!" : getTime(order.dateOfOrder) > 0 ? "In delivery!" : "Delivered!"}</label> : <></>}
                                {props.userType === "seller-new" ? <CountdownTimer initialCount={getTime(order.dateOfOrder)} /> : <></>}
                                <button onClick={() => handleDetails(order.orderId)} className="button-9-allorders" >Details</button>
                            </li>
                        ))}
                    </ul>

            }
        </section>
    )
}

export default Orders;