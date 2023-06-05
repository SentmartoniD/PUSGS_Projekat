import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                /* if (prevCount <= Math.floor(initialCount / 2)) {
                     console.log("half")
                     setShowButton(false); // hide
                 }*/
                checkTimeForButton(prevCount)
                return prevCount - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const checkTimeForButton = (time) => {
        if (time <= Math.floor(initialCount / 2)) {
            console.log("half")
            setShowButton(false); // hide
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        //remaining seconds
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            {count > 0 ? <div>{formatTime(count)}</div> : null}
            {showButton ? <button>Cancel order!</button> : null}
        </div>
    );
};

export default CountdownTimer;