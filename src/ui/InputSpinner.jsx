import React from 'react';
import styled from 'styled-components';
const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  `;
const SpinnerButton = styled.button`
  background-color: var(--color-brand-500);
  border: 1px solid #ccc;
  padding: 10px 10px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;
function InputSpinner({ value, setValue }) {
  const handlePaymentNumberChange = (e) => {
    if (e.target.value < 100) setValue((prev) => Math.max(e.target.value, 1));
    else setValue((prev) => Math.min(e.target.value, 100));
    console.log('Changed value:', value);
  };

  const incrementPaymentNumber = () => {
    setValue((prev) => Math.min(prev + 1, 100)); // Max value of 100
  };

  const decrementPaymentNumber = () => {
    setValue((prev) => Math.max(prev - 1, 1)); // Min value of 1
  };
  const handleBlur = () => {
    if (value < 100) setValue((prev) => Math.max(value, 1));
    else setValue((prev) => Math.min(value, 100));
    console.log('final value:', value);
  };

  return (
    <SpinnerWrapper>
      <SpinnerButton type="button" onClick={decrementPaymentNumber}>
        -
      </SpinnerButton>
      <Input
        type="number"
        style={{ width: '100%', direction: 'ltr', textAlign: 'right' }}
        value={value}
        onChange={handlePaymentNumberChange}
        onBlur={handleBlur}
        min={1}
        max={100}
      />
      <SpinnerButton type="button" onClick={incrementPaymentNumber}>
        +
      </SpinnerButton>
    </SpinnerWrapper>
  );
}

export default InputSpinner;
