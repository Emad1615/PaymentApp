import styled from 'styled-components';
import AddPaymentType from './AddPaymentType';
import CustomSelect from '../ui/CustomSelect';

const Form = styled.form`
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
  return (
    <Form>
      <Row>
        <CustomSelect
          options={options}
          value={1}
          setValue={() => {}}
          placeholder="اختر نوع الدفع"
        />
        <AddPaymentType />
      </Row>
      <Row>
        <CustomSelect
          options={options}
          value={1}
          setValue={() => {}}
          placeholder="اختر العام الدراسي "
        />
        <CustomSelect
          options={options}
          value={1}
          setValue={() => {}}
          isMulti={true}
          placeholder="اختر  الفروع"
        />
        <CustomSelect
          options={options}
          value={1}
          setValue={() => {}}
          isMulti={true}
          placeholder="اختر نوع التعليم"
        />
      </Row>
      
    </Form>
  );
}

export default PaymentForm;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
