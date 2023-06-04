import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllOrdersForAdmin, GetAllCurrentOrdersForSeller, GetAllPastOrdersForSeller } from "../../services/OrderService";



const Orders = (props) => {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    const navigateToOrder = () => {
        navigate('/home/all-orders/{id}');
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


    return (
        <section className="section-allorders" >
            <h1>All orders</h1>
            {
                orders.length === 0 ? <></> :
                    <ul className="ul-items-allorders" >
                        {orders.map((order) => (
                            <li id={order.orderId} className="item-allorders" >
                                <label>Adrress : {order.address}</label>
                                <label>Comment : {order.comment}</label>
                                <label>Price : {order.price}</label>
                                {props.userType === "admin" ? <label>Delivery state : { }</label> : <></>}
                                {props.userType === "seller-new" ? <label>Countdown : { }</label> : <></>}
                                <button>Details</button>
                            </li>
                        ))}
                    </ul>

            }
        </section>
    )
}

export default Orders;