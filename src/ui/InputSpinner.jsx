import React, { useState } from 'react';

const InputSpinner = ({ step, min, max, value, handleBlur, handlePaymentNumberChange }) =>
{
    const [paymentNumber, setPaymentNumber] = useState(1);

    const handlePaymentNumberChange = (e) =>
    {
        let value = e.target.value;
        if (value === '')
        {
            setPaymentNumber('');
            return;
        }

        // Limit precision to 2 decimal places
        const numericValue = parseFloat(value).toFixed(2);
        setPaymentNumber(numericValue);
    };

    const handleBlur = () =>
    {
        // When the input field loses focus, you can handle final processing or validation
        console.log('Input blurred, final value:', paymentNumber);
    };

    return (
        <div>
            <input
                type="number"
                value={value}
                onChange={handlePaymentNumberChange}
                onBlur={handleBlur}
                step={step}
                min={min}
                max={max}
            />
        </div>
    );
};

export default InputSpinner;
