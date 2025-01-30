import React, { useEffect, useState } from 'react';
import Button from '../ui/Button'; // Make sure the Button component exists
import Title from '../ui/Title';
import { FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import { ModalBody, ModalHeader, ModalOverlay } from '../ui/ModalStyledDiv';
import EditPaymentForm from './EditPaymentForm';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
`;
function EditPaymentModal({ rowData, gridPaymentData, setGridPaymentData }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    console.log('logMod:');
    console.log(gridPaymentData);
    
}, [gridPaymentData,setGridPaymentData])
    return (
        <>
            <Button style={{ width: '100%' }} type="button" onClick={() => setShowModal((prev) => !prev)}>
                <FaEdit /> تعديل
            </Button>
            {showModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalHeader>
                            <Title style={{ width: '100%' }}>
                                تعديل أنظمة الدفع الحالية
                                <Button
                                    style={{ float: 'left' }}
                                    type="button"
                                    onClick={() => setShowModal((prev) => !prev)}>
                                    X
                                </Button>
                            </Title>
                        </ModalHeader>
                        <ModalBody>
                            <EditPaymentForm setShowModal={setShowModal} rowData={rowData} gridPaymentData={gridPaymentData} setGridPaymentData={setGridPaymentData} />
                        </ModalBody>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </>
    );
}

export default EditPaymentModal;
