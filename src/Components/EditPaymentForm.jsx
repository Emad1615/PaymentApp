import Switch from 'react-switch';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import InputSpinner from './../ui/InputSpinner';
import { FaRegSave } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { getPaymentTypeList } from '../Services/paymentTypeService';
import { BiSolidSave } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import EditRunTimeTable from './EditRunTimeTable';

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
  const [editingData, setEditingData] = useState([]);


  async function fetchEditedPaymentList() {
    const filterPaymentObj = {
      branchId: rowData.branchId,
      educationTypeId: rowData.educationTypeId,
      paymentTypeId: rowData.paymentTypeId,
      educationYearId: rowData.educationYearId
    }
    const response = await getPaymentTypeList(filterPaymentObj);
    if (response.success) {
      setEditingData(response.data.map(item => ({ value: item.id, label: item.name, number: item.paymentNo })));
    }
  }

  useEffect(() => {
    fetchEditedPaymentList();
  }, [rowData]);


  const handleEditPaymentSave = async () => {

    setLoading(false);
  };
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {loading && (
        <Overlay>
          <ClipLoader size={50} color={'#6366f1'} />
        </Overlay>
      )}
      <Container>
        <EditRunTimeTable
          editingData={editingData}
          setEditingData={setEditingData}
          loading={loading}
        />
        <Button disabled={loading} type="button" variation="success" onClick={() => handleEditPaymentSave()}>
          {loading ? <ClipLoader size={20} color={'#fff'} /> : <BiSolidSave />}
          حفـــظ
        </Button>
      </Container>

    </div>
  );
}

export default EditPaymentForm;
