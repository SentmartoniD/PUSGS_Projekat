import React, { useState, useEffect } from 'react';
import { CancelOrder } from '../services/OrderService';

const CountdownTimer = ({ initialCount, id, updateSharedState }) => {
    const [count, setCount] = useState(initialCount);
    //const [number, setNumber] = useState(initialCount);
    const [showButton, setShowButton] = useState(true);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                return prevCount - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        //remaining seconds
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleCancelOrder = async () => {
        try {
            const response = await CancelOrder(id);
            console.log(response.data);
            setTrigger(trigger + 1);
            alert("You have successfully cancelled the order!")
            updateSharedState();
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, canceling order failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
    }

    return (
        <div>
            {count > 0 ? <div>Delivery time : {formatTime(count)}</div> : null}
            {showButton && id != null ? <button onClick={handleCancelOrder} >Cancel order!</button> : null}
        </div>
    );
};

export default CountdownTimer;