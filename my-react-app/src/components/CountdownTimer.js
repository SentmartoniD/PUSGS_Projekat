import React, { useState, useEffect } from 'react';
import { CancelOrder } from '../services/OrderService';

const CountdownTimer = ({ initialCount, id }) => {
    const [count, setCount] = useState(initialCount);
    const [showButton, setShowButton] = useState(true);

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

    useEffect(() => {
        if (count <= Math.floor(initialCount / 2)) {
            setShowButton(false); // hide
        }
    }, [count])

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
            {count > 0 ? <div>{formatTime(count)}</div> : null}
            {showButton ? <button onClick={handleCancelOrder} >Cancel order!</button> : null}
        </div>
    );
};

export default CountdownTimer;