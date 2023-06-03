import { useState, useEffect } from "react";





const CurrentPastOrders = () => {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

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
        <section className="continaer-cpo" >
            <div className="box-cpo" >
                <h1 className="h1-cpo" >Current orders!</h1>
                {
                    currentOrders.length === 0 ? <></> :
                        <ul >
                            {orders.map((order) => (
                                <li id={order.orderId}  >
                                    <label>Address : {order.address}</label>
                                    <label>Comment : {order.comment}</label>
                                    <label>Price : {order.price}</label>
                                    {
                                        storedDateTime = new Date(dateTimeStringFromServer)
s
                                    }
                                </li>
                            ))}
                        </ul>

                }
            </div>
            <div className="box-cpo" >
                <h1 className="h1-cpo" >Past orders!</h1>
                {
                    pastOrders.length === 0 ? <></> :
                        <ul >
                            {orders.map((order) => (
                                <li id={order.orderId}>
                                    <label>Address : {order.address}</label>
                                    <label>Comment : {order.comment}</label>
                                    <label>Price : {order.price}</label>
                                </li>
                            ))}
                        </ul>

                }
            </div>
        </section>
    )
}



export default CurrentPastOrders;