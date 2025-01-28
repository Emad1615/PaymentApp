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
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import { DateBox, NumberBox } from 'devextreme-react';

import 'devextreme/dist/css/dx.light.css';

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
  const [realData, setRealData] = useState([]);
  const [showRealTable, setShowRealTable] = useState(false);

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
        paymentType: paymentType.label,
        year: year.value,
        branchIds: branchs.map((branch) => branch.value),
        branchs: branchs.map((branch) => branch.label).join(' - '),
        educationTypeIds: educationTypes.map((education) => education.value),
        educationTypes: educationTypes.map((education) => education.label).join(' - '),
        percentage: 100 / paymentType.number,
        startDate: idx === 0 ? new Date() : addDays(Arr[idx - 1]?.endDate, 1),
        endDate:
          idx === 0
            ? addDays(new Date(), 10)
            : addDays(Arr[idx - 1]?.endDate, 11),
      }),
    );
    setData(Arr);
    setShowRealTable(false);
  }

  function handleRealPaymentType() {
    setRealData(PaymentSettings);
    setShowRealTable(true);
  }
  function clearData() {
    setPaymentType(null);
    setYear(null);
    setBranchs(null);
    setEducationTypes([]);
    setData([]);
    setRealData([]);
    setShowRealTable(false);
  }
  // Function to ensure total percentage equals 100
  function validateTotalPercentage() {
    const totalPercentage = data.reduce((sum, row) => sum + row.percentage, 0);
    if (totalPercentage !== 100) {
      toast.error("إجمالي النسبة يجب أن يكون 100");
      return false;
    }
    return true;
  }

  // Function to update percentage and adjust others to maintain total 100
  function adjustPercentages(updatedIndex, updatedValue) {
    const total = data.reduce((sum, row, index) => (index !== updatedIndex ? sum + row.percentage : sum), 0);
    const remaining = 100 - total;
    const updatedData = [...data];
    updatedData[updatedIndex].percentage = updatedValue;

    // Adjust other percentages to make the total sum 100
    let remainingRows = updatedData.filter((_, index) => index !== updatedIndex);
    let totalRemaining = remaining;
    remainingRows.forEach((row, index) => {
      const newPercentage = totalRemaining / remainingRows.length;
      updatedData[index].percentage = newPercentage;
      totalRemaining -= newPercentage;
    });

    setData(updatedData);
  }

  // Validate endDate is not before startDate
  function validateEndDate(e) {
    const { value, rowIndex } = e;
    const updatedData = [...data];
    const row = updatedData[rowIndex];
    const startDate = row.startDate;

    if (value < startDate) {
      toast.error("تاريخ الانتهاء لا يمكن أن يكون قبل تاريخ البدء.");
      e.cancel = true; // Prevent updating the cell if the validation fails
    }
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
          onClick={handleAddPaymentType}
          disabled={!paymentType || !year || !branchs.length || !educationTypes.length}
        >
          <FaRegEye /> استعراض
        </Button>
        <Button
          type="button"
          variation="primary"
          onClick={handleRealPaymentType}>
          <FaSearch /> بحــث
        </Button>
        <Button type="button" variation="danger" onClick={() => clearData()}>
          <MdCancel />
          الغاء
        </Button>
      </ButtonGroup>
      <DataGrid id='DivRunTimeTable' dataSource={data} showBorders={true} idField="id"
        style={{ display: showRealTable ? 'none' : 'block' }}
      >
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentTypeId" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branchs" caption="الفروع" />
        <Column dataField="educationTypes" caption="نوع التعليم" />

        <Column
          dataField="percentage"
          caption="النسبة"
          editCellComponent={NumberBox}
          editorOptions={{
            min: 0,
            max: 100,
            showSpinButtons: true,
          }}
          onValueChanged={(e) => {
            const { value, rowIndex } = e;
            if (value > 100) {
              toast.error("النسبة لا يمكن أن تتجاوز 100");
              e.cancel = true;
              return;
            }
            adjustPercentages(rowIndex, value);
            if (!validateTotalPercentage()) {
              e.cancel = true;
            }
          }}
        />

        {/* Start Date column */}
        <Column
          dataField="startDate"
          caption="تاريخ البدء"
          dataType="date"
          editCellComponent={DateBox}
        />

        {/* End Date column */}
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          dataType="date"
          editCellComponent={DateBox}
          onValueChanged={validateEndDate}
        />

        <Editing allowUpdating={true} allowAdding={false} allowDeleting={false} mode="cell" />
        <Paging defaultPageSize={10} />
      </DataGrid>
      <DataGrid id='gridRealTable' dataSource={realData} showBorders={true} idField="id"
        style={{ display: showRealTable ? 'block' : 'none' }} 
      >
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentTypeId" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branch" caption="الفرع" />
        <Column dataField="educationType" caption="نوع التعليم" />

        <Column
          dataField="percentage"
          caption="النسبة"
        />
        <Column
          dataField="startDate"
          caption="تاريخ البدء"
          dataType="date"
        />
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          dataType="date"
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
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

const PaymentSettings = [
  { value: 1, educationTypeId: 1, educationType: 'اهلي', branchId: 1, branch: 'فرع 1', yearId: 1, year: 2025, paymentTypeId: 2, paymentType: 'دفعتين', percentage: 50, startDate: '2025-01-01', endDate: '2025-01-31' },
  { value: 2, educationTypeId: 1, educationType: 'اهلي', branchId: 1, branch: 'فرع 1', yearId: 1, year: 2025, paymentTypeId: 2, paymentType: 'دفعتين', percentage: 50, startDate: '2025-02-01', endDate: '2025-03-31' },
];
