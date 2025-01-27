import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button'; // Make sure the Button component exists
import toast from 'react-hot-toast';
import Title from '../ui/Title';
import Switch from 'react-switch';
import InputSpinner from 'react-bootstrap-input-spinner';
import "bootstrap/dist/css/bootstrap.css";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const AddPaymentTypeModal = ({ isOpen, closeModal, onSave }) => {
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [paymentNumber, setPaymentNumber] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    const handleSave = () => {
        if (paymentNumber <= 0) {
            toast.error("عدد الدفعات يجب أن يكون أكبر من 0");
            return; // Don't proceed if validation fails
        }

        const newPaymentType = { nameAr, nameEn, paymentNumber, isDefault };
        onSave(newPaymentType);
        closeModal();
    };

    const handlePaymentNumberChange = (e) => {
        const value = Math.max(1, e.target.value);
        setPaymentNumber(value);
    };

    return (
        isOpen && (
            <ModalOverlay>
                <ModalContainer>
                    <ModalHeader>
                        <Title style={{ width: '100%' }}>إضافة نوع الدفع
                            <Button style={{ float: 'left' }} type="button" onClick={closeModal}>
                                X
                            </Button>
                        </Title>

                    </ModalHeader>
                    <ModalBody>
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
                        <div >
                            <Switch
                                checked={isDefault}
                                className="react-switch"
                                onChange={() => setIsDefault(!isDefault)}
                                offColor="#888"
                                onColor="#0d6efd"
                                offHandleColor="#fff"
                                onHandleColor="#fff"
                                uncheckedIcon={<span style={{ color: "#fff", marginLeft: '10px', position: 'absolute', top: '3px' }}> لا  </span>}  // Custom text for OFF state
                                checkedIcon={<span style={{ color: "#fff", marginLeft: '11px', position: 'absolute', top: '1px' }}>  نعم  </span>}  // Custom text for ON state
                                height={30}  // Larger height
                                width={70}   // Larger width
                            />
                        </div>

                        <Button onClick={handleSave}>حفظ</Button>
                    </ModalBody>
                </ModalContainer>
            </ModalOverlay>
        )
    );
};

export default AddPaymentTypeModal;
