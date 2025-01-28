import React, {  useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button'; // Make sure the Button component exists
import toast from 'react-hot-toast';
import Title from '../ui/Title';
import { FaPlus } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.css';
import PaymentTypeForm from './PaymentTypeForm';

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

function AddPaymentTypeModal({ paymentType, setPaymentType }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setShowModal((prev) => !prev)}>
        <FaPlus /> إضافة
      </Button>
      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <Title style={{ width: '100%' }}>
                إضافة نوع الدفع
                <Button
                  style={{ float: 'left' }}
                  type="button"
                  onClick={() => setShowModal((prev) => !prev)}>
                  X
                </Button>
              </Title>
            </ModalHeader>
            <ModalBody>
              <PaymentTypeForm paymentType={paymentType} setPaymentType={setPaymentType} />
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}

export default AddPaymentTypeModal;
