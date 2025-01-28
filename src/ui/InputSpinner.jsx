import React, { useState } from 'react';

const InputSpinner = () =>
{
    const [paymentNumber, setPaymentNumber] = useState(1);

    const handleIncrement = () =>
    {
        setPaymentNumber((prevValue) => Math.min(prevValue + 1, 100)); // Limit to max 100
    };

    const handleDecrement = () =>
    {
        setPaymentNumber((prevValue) => Math.max(prevValue - 1, 1)); // Limit to min 1
    };

    const handleChange = (e) =>
    {
        setPaymentNumber(Number(e.target.value));
    };

    return (
        <div>
            <button onClick={handleDecrement}>-</button>
            <input
                type="number"
                value={paymentNumber}
                onChange={handleChange}
                min={1}
                max={100}
                step="0.01"
            />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default InputSpinner;