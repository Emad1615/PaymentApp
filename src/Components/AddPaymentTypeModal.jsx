import React, {  useEffect, useState } from 'react';
import Button from '../ui/Button'; // Make sure the Button component exists
import Title from '../ui/Title';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { ModalBody, ModalContainer, ModalHeader, ModalOverlay } from '../ui/ModalStyledDiv';

import 'bootstrap/dist/css/bootstrap.css';
import PaymentTypeForm from './PaymentTypeForm';

function AddPaymentTypeModal({ updatePaymentList, paymentType, setPaymentType }) {
  const [showModal, setShowModal] = useState(false);

   useEffect(() => {

   },[paymentType])
  return (
    <>
      <Button type="button" onClick={() => setShowModal((prev) => !prev)}>
        {paymentType != null ? <FaEdit /> : <FaPlus />} 
        {paymentType != null ? 'تعديل' : 'إضافة'} 
      </Button>
      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <Title style={{ width: '100%' }}>
              {paymentType != null ? 'تعديل' : 'إضافة'}  نوع الدفع
                <Button
                  style={{ float: 'left' }}
                  type="button"
                  onClick={() => setShowModal((prev) => !prev)}>
                  X
                </Button>
              </Title>
            </ModalHeader>
            <ModalBody>
              <PaymentTypeForm updatePaymentList={updatePaymentList} paymentType={paymentType} setPaymentType={setPaymentType} />
            </ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
}

export default AddPaymentTypeModal;
