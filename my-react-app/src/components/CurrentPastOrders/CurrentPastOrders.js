import { useState, useEffect } from "react";
import { GetAllOrdersForBuyer } from "../../services/OrderService";
import CountdownTimer from "../CountdownTimer";
import { useNavigate } from "react-router-dom";




const CurrentPastOrders = () => {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const GetOrders = async () => {
            try {
                const resp = await GetAllOrdersForBuyer();
                console.log(resp.data);
                setCurrentOrders(resp.data["item1"]);
                setPastOrders(resp.data["item2"]);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response, geting articles failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        GetOrders();

    }, [trigger])

    const getTime = (dateOfOrder) => {
        const date = new Date(dateOfOrder);
        date.setMinutes(date.getMinutes() + 2);
        const currentTime = new Date();
        return Math.floor((date - currentTime) / 1000);
    };

    const navigate = useNavigate();
    const navigateToOrderDetails = (oId) => {
        navigate('order-details/:' + oId);
    };

    const handleDetails = (oId) => {
        navigateToOrderDetails(oId);
    }

    const updateSharedState = () => {
        setTrigger(trigger + 1);
    };

    return (
        <section className="container-cpo" >
            <div className="box-cpo" >
                <h1 className="h1-cpo" >Current orders!</h1>
                {
                    currentOrders.length === 0 ? <></> :
                        <ul className="ul-items-cpo" >
                            {currentOrders.map((order) => (
                                <li id={order.orderId} className="item-cpo" >
                                    <label>Address : {order.address}</label>
                                    <label>Comment : {order.comment}</label>
                                    <label>Price : {order.price}</label>
                                    <CountdownTimer initialCount={() => getTime(order.dateOfOrder)} id={order.orderId} updateSharedState={updateSharedState} />
                                </li>
                            ))}
                        </ul>

                }
            </div>
            <div className="box-cpo" >
                <h1 className="h1-cpo" >Past orders!</h1>
                {
                    pastOrders.length === 0 ? <></> :
                        <ul className="ul-items-cpo" >
                            {pastOrders.map((order) => (
                                <li id={order.orderId} className="item-cpo" >
                                    <label>Address : {order.address}</label>
                                    <label>Comment : {order.comment}</label>
                                    <label>Price : {order.price}</label>
                                    <button onClick={() => handleDetails(order.orderId)} className="button-9-allorders" >Details</button>
                                </li>
                            ))}
                        </ul>

                }
            </div>
        </section>
    )
}



export default CurrentPastOrders;