import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { ClipLoader } from 'react-spinners';
import { BiSolidSave } from 'react-icons/bi';
import { Container } from 'react-bootstrap';
import EditRunTimeTable from './EditRunTimeTable';
import { getAllPaymentByFilters } from '../Services/paymentService';

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


  useEffect(() => {
    if (rowData) {
      const fetchEditedPaymentList = async () => {
        setLoading(true);

        const filterPaymentObj = {
          paymentTypeId: rowData.paymentTypeId,
          educationYearId: rowData.educationYearId,
          branchIds : [rowData.branchId] ,
          educationTypeIds :[rowData.educationTypeId]
        }
        const response = await getAllPaymentByFilters(filterPaymentObj);
        if (response.success) {
          setEditingData(response.data);
        }
        setLoading(false);
      }
      fetchEditedPaymentList();
    }
  }, [rowData]);


  const handleEditPaymentSave = async () => {
    setLoading(true);

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

        <Button
          style={{ width: '100%', marginTop: '10px' }}
          disabled={loading} type="button" variation="success" onClick={() => handleEditPaymentSave()}>
          {loading ? <ClipLoader size={20} color={'#fff'} /> : <BiSolidSave />}
          حفـــظ
        </Button>
      </Container>

    </div>
  );
}

export default EditPaymentForm;
