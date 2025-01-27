import styled from 'styled-components';
import AddPaymentType from './AddPaymentType';
import CustomSelect from '../ui/CustomSelect';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import { FaRegEye, FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useState } from 'react';
import { addDays } from 'date-fns';
import toast from 'react-hot-toast';

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
    if (!paymentType || !year || !branchs.length || !educationTypes.length) {
      toast.error(`يجب اختيار نوع الدفع والعام الدراسي والفروع ونوع التعليم`);
      return;
    }
    if (data.length === paymentType.number) {
      toast.error(`تم اضافة الدفعات بالفعل`);
      return;
    }
    let Arr = [];
    Array.from({ length: paymentType.number }, (_, i) => i).map((_, idx) =>
      Arr.push({
        id: idx + 1,
        paymentTypeId: paymentType.value,
        year: year.value,
        branchIds: branchs.map((branch) => branch.value),
        branchs: branchs.map((branch) => branch.label).join(' - '),
        educationTypeIds: educationTypes.map((education) => education.value),
        educationTypes: educationTypes
          .map((education) => education.label)
          .join(' - '),
        percentage: 100 / paymentType.number,
        startDate: idx === 0 ? new Date() : addDays(Arr[idx - 1]?.endDate, 1),
        endDate:
          idx === 0
            ? addDays(new Date(), 10)
            : addDays(Arr[idx - 1]?.endDate, 11),
      }),
    );
    setData(Arr);
  }
  function clearData() {
    setPaymentType(null);
    setYear(null);
    setBranchs(null);
    setEducationTypes([]);
    setData([]);
  }
  console.log(data);
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
      <ButtonGroup justifycontent="end">
        <Button
          type="button"
          variation="purpleSharp"
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
