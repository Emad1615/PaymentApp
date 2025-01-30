import Switch from 'react-switch';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import InputSpinner from './../ui/InputSpinner';
import { FaRegSave } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

function EditPaymentForm({ rowData, gridPaymentData, setGridPaymentData }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [gridPaymentData]);

  const handleSave = async () => {

    setLoading(false);
  };
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '5px' }}>
       {loading && (
        <Overlay>
          <ClipLoader size={50} color={'#6366f1'} />
        </Overlay>
      )}
      <label>اسم نوع الدفع بالعربية</label>
      <Button
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? <ClipLoader size={20} color={'#fff'} /> : <FaRegSave />}
        حفظ</Button>
    </div>
  );
}

export default EditPaymentForm;
