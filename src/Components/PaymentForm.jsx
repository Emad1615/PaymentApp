import styled from 'styled-components';
import AddPaymentType from './AddPaymentType';
import CustomSelect from '../ui/CustomSelect';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import { FaRegEye } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';

const Form = styled.div`
  margin: 2rem 0;
  box-shadow: var(--shadow-md);
  padding: 18px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: start;
  }
`;
function PaymentForm() {
  const [paymentType, setPaymentType] = useState(null);
  const [year, setYear] = useState(null);
  const [branchs, setBranchs] = useState([]);
  const [educationTypes, setEducationTypes] = useState([]);
  const [data, setData] = useState([]);
  function handleAddPaymentType() {
    Array.from({ length: paymentType.number }).forEach((_, index) => {
      setData((prev) => [
        ...prev,
        {
          id: Math.random(),
          paymentTypeId: paymentType.value,
          year: year.value,
          branchIds: branchs.map((branch) => branch.value),
          educationTypeIds: educationTypes.map((education) => education.value),
        },
      ]);
    });
    console.log(data);
  }
  function clearData() {
    setPaymentType(null);
    setYear(null);
    setBranchs(null);
    setEducationTypes([]);
    setData([]);
    console.log('clear');
  }
  return (
    <Form>
      <Row>
        <CustomSelect
          key="Types"
          options={paymentTypes}
          value={paymentType}
          setValue={setPaymentType}
          placeholder="اختر نوع الدفع"
        />
        <AddPaymentType />
      </Row>
      <Row>
        <CustomSelect
          key="Years"
          options={Years}
          value={year}
          setValue={setYear}
          placeholder="اختر العام الدراسي "
        />
        <CustomSelect
          key="Branches"
          options={Branches}
          value={branchs}
          setValue={setBranchs}
          isMulti={true}
          placeholder="اختر  الفروع"
        />
        <CustomSelect
          key="Education"
          options={Education}
          value={educationTypes}
          setValue={setEducationTypes}
          isMulti={true}
          placeholder="اختر نوع التعليم"
        />
      </Row>
      <ButtonGroup justifyContent="end">
        <Button
          type="button"
          variation="primary"
          onClick={handleAddPaymentType}>
          <FaRegEye /> استعراض
        </Button>
        <Button type="button" variation="danger" onClick={() => clearData()}>
          <MdCancel />
          الغاء
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default PaymentForm;

const paymentTypes = [
  { value: 1, label: 'دفعة واحدة', number: 1 },
  { value: 2, label: 'دفعتين ', number: 2 },
  { value: 3, label: '3 دفعات', number: 3 },
];
const Years = [
  { value: 1, label: 2025 },
  { value: 2, label: 2026 },
  { value: 3, label: 2027 },
];
const Branches = [
  { value: 1, label: 'فرع 1' },
  { value: 2, label: '2 فرع' },
  { value: 3, label: 'فرع 3' },
];
const Education = [
  { value: 1, label: 'اهلي' },
  { value: 2, label: 'عالمي' },
  { value: 3, label: 'مصري' },
];
