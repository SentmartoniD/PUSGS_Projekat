import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllOrders } from "../../services/OrderService";



const AllOrders = () => {

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();
    const navigateToOrder = () => {
        navigate('/home/all-orders/{id}');
    };

    useEffect(() => {
        const GetOrders = async () => {
            try {
                const resp = await GetAllOrders();
                console.log(resp.data);
                setOrders(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting articles failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetOrders();
    }, [])


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
                                <label>Delivery state : { }</label>
                                <button>Details</button>
                            </li>
                        ))}
                    </ul>
            }
        </section>
    )
}

export default AllOrders;