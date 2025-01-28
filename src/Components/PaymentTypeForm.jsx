import Switch from 'react-switch';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SpinnerButton = styled.button`
  background-color: var(--color-brand-500);
  border: 1px solid #ccc;
  padding: 10px 10px;
  font-size: 14px;
  cursor: pointer;
color:white;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;
function PaymentTypeForm()
{
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSavePaymentType = (newPaymentType) =>
  {
    // setPaymentType((prevTypes) => [...prevTypes, newPaymentType]);
    toast.success('تم إضافة نوع الدفع بنجاح');
  };

  const handleSave = () =>
  {
    if (paymentNumber <= 0)
    {
      toast.error('عدد الدفعات يجب أن يكون أكبر من 0');
      return; // Don't proceed if validation fails
    }

    // const newPaymentType = { nameAr, nameEn, paymentNumber, isDefault };
    // onSave(newPaymentType);
    // closeModal();
  };

  const handlePaymentNumberChange = (e) =>
  {
    if (e.target.value < 100)
      setPaymentNumber(prev => Math.max(e.target.value, 1))
    else
      setPaymentNumber(prev => Math.min(e.target.value, 100))
    console.log('IC value:', paymentNumber);
  };

  const incrementPaymentNumber = () =>
  {
    setPaymentNumber(prev => Math.min(prev + 1, 100)); // Max value of 100
  };

  const decrementPaymentNumber = () =>
  {
    setPaymentNumber(prev => Math.max(prev - 1, 1)); // Min value of 1
  };
  const handleBlur = () =>
  {
    if (paymentNumber < 100)
      setPaymentNumber(prev => Math.max(paymentNumber, 1))
    else
      setPaymentNumber(prev => Math.min(paymentNumber, 100))
    // When the input field loses focus, you can handle final processing or validation
    console.log('Input blurred, final value:', paymentNumber);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label>اسم نوع الدفع بالعربية</label>
      <Input
        type="text"
        value={nameAr}
        onChange={(e) => setNameAr(e.target.value)}
      />

      <label>اسم نوع الدفع بالإنجليزية</label>
      <Input
        type="text"
        value={nameEn}
        onChange={(e) => setNameEn(e.target.value)}
      />

      <label>عدد الدفعات</label>
      <SpinnerWrapper>
        <SpinnerButton type="button" onClick={decrementPaymentNumber}>-</SpinnerButton>
        <Input
          type="number"
          style={{ width: '100%' }}
          value={paymentNumber}
          onChange={handlePaymentNumberChange}
          onBlur={handleBlur}
          min={1}
          max={100}
        />
        <SpinnerButton type="button" onClick={incrementPaymentNumber}>+</SpinnerButton>
      </SpinnerWrapper>
      <label>هل هو النوع الافتراضي؟</label>
      <div>
        <Switch
          checked={isDefault}
          className="react-switch"
          onChange={() => setIsDefault(!isDefault)}
          offColor="#888"
          onColor="#6366f1"
          offHandleColor="#fff"
          onHandleColor="#fff"
          uncheckedIcon={
            <span style={{ color: '#fff', marginLeft: '10px', position: 'absolute', top: '3px', }}> {' '} لا{' '} </span>
          } // Custom text for OFF state
          checkedIcon={
            <span
              style={{
                color: '#fff',
                marginLeft: '11px',
                position: 'absolute',
                top: '1px',
              }}>
              {' '}
              نعم{' '}
            </span>
          } // Custom text for ON state
          height={30} // Larger height
          width={70} // Larger width
        />
      </div>
      <Button onClick={handleSave}>حفظ</Button>
    </div>
  );
}

export default PaymentTypeForm;
{/* <InputSpinner
        min={1}
        max={100}
        step={1}
        value={paymentNumber}
        onChange={handlePaymentNumberChange}
      /> */}
{/* <input
        type="number"
        value={paymentNumber}
        onChange={() => { }}
        onBlur={() => { }}
        min={1}
        max={100}
      /> */}