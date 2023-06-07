import React, { useState, useEffect } from 'react';
import { CancelOrder } from '../services/OrderService';

const CountdownTimer = ({ initialCount, id }) => {
    const [count, setCount] = useState(initialCount);
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
    /*
        useEffect(() => {
            const timer = setTimeout(() => {
                console.log(initialCount);
                setShowButton(false);
            }, initialCount * 500); // Multiply the number of seconds by 500 to get milliseconds
    
            return () => clearTimeout(timer); // Clear the timeout when the component unmounts or re-renders
        }, [initialCount]);*/

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
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, cnaceling order failed!");
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