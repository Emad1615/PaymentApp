import Switch from 'react-switch';
import InputSpinner from 'react-bootstrap-input-spinner';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function PaymentTypeForm() {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSavePaymentType = (newPaymentType) => {
    // // Save the new payment type (add it to the list or update your state)
    // setPaymentType((prevTypes) => [...prevTypes, newPaymentType]);
    toast.success('تم إضافة نوع الدفع بنجاح');
  };

  const handleSave = () => {
    if (paymentNumber <= 0) {
      toast.error('عدد الدفعات يجب أن يكون أكبر من 0');
      return; // Don't proceed if validation fails
    }

    // const newPaymentType = { nameAr, nameEn, paymentNumber, isDefault };
    // onSave(newPaymentType);
    // closeModal();
  };

  const handlePaymentNumberChange = (e) => {
    const value = Math.max(1, e.target.value);
    setPaymentNumber(value);
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
      <InputSpinner
        type="real"
        precision={0}
        min={1}
        max={100}
        step={1}
        value={paymentNumber}
        onChange={handlePaymentNumberChange}
      />

      <label>هل هو النوع الافتراضي؟</label>
      <div>
        <Switch
          checked={isDefault}
          className="react-switch"
          onChange={() => setIsDefault(!isDefault)}
          offColor="#888"
          onColor="#0d6efd"
          offHandleColor="#fff"
          onHandleColor="#fff"
          uncheckedIcon={
            <span
              style={{
                color: '#fff',
                marginLeft: '10px',
                position: 'absolute',
                top: '3px',
              }}>
              {' '}
              لا{' '}
            </span>
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
