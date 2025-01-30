import styled from 'styled-components';
import CustomSelect from '../ui/CustomSelect';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import AddPaymentTypeModal from './AddPaymentTypeModal';
import { FaRegEye, FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import RunTimeTable from './RunTimeTable';
import { BiSolidSave } from 'react-icons/bi';
import { CheckBranchsOrEducationTypeHasPaymentType, createPaymentSettingByList, getAllPaymentByFilters } from '../Services/paymentService';
import Swal from 'sweetalert2';
import { getPaymentTypeList } from '../Services/paymentTypeService';
import { getBranchesList } from '../Services/branchService';
import { getEducationTypeList } from '../Services/educationTypeService';
import { getEducationYearList } from '../Services/educationYearService';
import RealTable from './RealTable';

const Container = styled.div`
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
const spinnerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '20px',
  color: '#fff',
  borderRadius: '5px',
};
function PaymentForm() {
  const [paymentType, setPaymentType] = useState(null);
  const [year, setYear] = useState(null);
  const [branchs, setBranchs] = useState([]);
  const [educationTypes, setEducationTypes] = useState([]);
  const [data, setData] = useState([]);
  const [gridPaymentData, setGridPaymentData] = useState([]);
  const [showRealTable, setShowRealTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [yearList, setYearsList] = useState([]);
  const [branchList, setBrancheList] = useState([]);
  const [educationTypeList, setEducationTypeList] = useState([]);

  async function handleRealPayment() {
    setLoading(true);

    const filterPaymentData = {
      paymentTypeId: paymentType?.value ?? null,
      educationYearId: year?.value ?? null,
      branchIds: branchs?.map(item => item.value) ?? [],
      educationTypeIds: educationTypes?.map(item => item.value) ?? []
    };
    const response = await getAllPaymentByFilters(filterPaymentData);
    if (response.success) {
      const paymentByFilters = response.data.map(item => ({
          id: item.id,
          paymentTypeId: item.paymentTypeId,
          paymentTypeName: item.paymentTypeName,
          branchId: item.branchId,
          branchName: item.branchName,
          educationTypeId: item.educationTypeId,
          educationTypeName: item.educationTypeName,
          educationYearId: item.educationYearId,
          educationYear: item.educationYear,
          paymentNumber: item.paymentNumber,
          paymentPercentage: item.paymentPercentage,
          paymentStartDate: new Date(item.paymentStartDate),  // Convert to Date object
          paymentEndDate: new Date(item.paymentEndDate),    // Convert to Date object
        }));

  setGridPaymentData(paymentByFilters);
      setShowRealTable(true);
    } else {
      setGridPaymentData([]);
    }
    setData([]);
    setLoading(false);
  }

  /***************** Handel Payment ******************/
  function handleAddPayment() {
    if (!paymentType || !year || !branchs.length || !educationTypes.length) {
      toast.error(`يجب اختيار نوع الدفع والعام الدراسي والفروع ونوع التعليم`);
      return;
    }
    setLoading(true);
    let Arr = [];
    Array.from({ length: paymentType.number }, (_, i) => i).map((_, idx) =>
      Arr.push({
        id: idx + 1,
        paymentTypeId: paymentType.value,
        paymentType: paymentType.label,
        yearId: year.value,
        year: year.label,
        branchIds: branchs.map((branch) => branch.value),
        branchs: branchs.map((branch) => branch.label).join(' - '),
        educationTypeIds: educationTypes.map((education) => education.value),
        educationTypes: educationTypes
          .map((education) => education.label)
          .join(' - '),
        percentage: (100 / paymentType.number).toFixed(2),
        startDate: idx === 0 ? new Date().toISOString().split('T')[0] : addDays(Arr[idx - 1]?.endDate, 1).toISOString().split('T')[0],
        endDate:
          idx === 0
            ? addDays(new Date(), 1).toISOString().split('T')[0]
            : addDays(Arr[idx - 1]?.endDate, 2).toISOString().split('T')[0],
      }),
    );
    setData(Arr);
    setGridPaymentData([]);
    setShowRealTable(false);
    setLoading(false);
  }

  async function handlePaymentSave() {
    const checkPaymentData = {
      paymentTypeId: paymentType.value,
      yearId: year.value,
      branchs: branchs.map(item => item.value),
      educationTypes: educationTypes.map(item => item.value)
    };
    //Check if One Of the Branchs or EducationType has this Payment Type before
    const response = await CheckBranchsOrEducationTypeHasPaymentType(checkPaymentData);
    if (response.success) {
      if (response.data.length > 0) {
        const foundPaymentsTable = `
          <table class="swal-table">
            <thead>
              <tr>
                <th>نـوع الدفعــات</th>
                <th>الســنه</th>
                <th>الفــرع</th>
                <th>نـوع التعليــم</th>
              </tr>
            </thead>
            <tbody>
              ${response.data.map(item => `
                <tr>
                  <td>${item.paymentTypeName}</td>
                  <td>${item.educationYear}</td>
                  <td>${item.branchName}</td>
                  <td>${item.educationTypeName}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        const result = await Swal.fire({
          title: 'هل تريد الاستمرار؟',
          html: ` تم العثور على نوع دفع موجود بالفعل. <br/> هل ترغب في استبداله؟ <br/> ${foundPaymentsTable} `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'نعم, استبدال',
          cancelButtonText: 'إلغاء',
        });
        if (!result.isConfirmed) {
          return;
        }
      }
    } else {
      return;
    }


    setLoading(true);
    const createPaymentSettingData = data.map(item => {
      return {
        paymentNumber: item.id,
        paymentTypeId: item.paymentTypeId,
        educationYearId: item.yearId,
        branches: item.branchIds,
        educationTypes: item.educationTypeIds,
        paymentPercentage: item.percentage,
        paymentStartDate: item.startDate,
        paymentEndDate: item.endDate,
      }
    })
    let result = await createPaymentSettingByList(createPaymentSettingData);
    console.log(result);
    if (result.success) {
      toast.success('تم إضافة أنظمة الدفع بنجاح');
      clearData();
    }
    setLoading(false);

  }
  /******** End Handel Payment Save  *********/

  /******** Start Clear Search And Grid  *********/
  function clearData() {
    setPaymentType(null);
    setYear(null);
    setBranchs(null);
    setEducationTypes([]);
    setData([]);
    setGridPaymentData([]);
    setShowRealTable(false);
  }
  /******** End Clear Function  *********/

  /******** Start Bind Drop Down  *********/
  const updatePaymentList = () => {
    fetchPaymentList();
  };

  async function fetchPaymentList() {
    const response = await getPaymentTypeList();
    if (response.success) {
      setPaymentList(response.data.map(item => ({ value: item.id, label: item.name, number: item.paymentNo })));
    }
  }
  async function fetchYearsList() {
    const response = await getEducationYearList();
    if (response.success) {
      setYearsList(response.data.map(item => ({ value: item.id, label: item.year })));
    }
  }

  async function fetchBranchList() {
    const response = await getBranchesList();
    if (response.success) {
      setBrancheList(response.data.map(item => ({ value: item.id, label: item.name })));
    }
  }
  async function fetchEducationType() {
    const response = await getEducationTypeList();
    if (response.success) {
      setEducationTypeList(response.data.map(item => ({ value: item.id, label: item.name })));
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchPaymentList();
    fetchYearsList();
    fetchBranchList();
    fetchEducationType();
    setLoading(false);
  }, [])

  /******** End Bind Drop Down  *********/


  return (
    <>
      <Container>
        <Row>
          <CustomSelect
            key="Types"
            options={paymentList}
            value={paymentType}
            setValue={setPaymentType}
            placeholder="اختر نوع الدفع"
          />
          <AddPaymentTypeModal updatePaymentList={updatePaymentList} paymentType={paymentType} setPaymentType={setPaymentType} />
        </Row>
        <Row>
          <CustomSelect
            key="Years"
            options={yearList}
            value={year}
            setValue={setYear}
            placeholder="اختر العام الدراسي "
          />
          <CustomSelect
            key="Branches"
            options={branchList}
            value={branchs}
            setValue={setBranchs}
            isMulti={true}
            placeholder="اختر  الفروع"
          />
          <CustomSelect
            key="Education"
            options={educationTypeList}
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
            onClick={handleAddPayment}
            disabled={
              loading ||
              !paymentType ||
              !year ||
              !branchs?.length ||
              !educationTypes?.length
            }>
            {loading ? <ClipLoader size={20} color={'#fff'} /> : <FaRegEye />}{' '}
            استعراض
          </Button>
          <Button
            type="button"
            variation="primary"
            onClick={handleRealPayment}
            disabled={loading}>
            {loading ? <ClipLoader size={20} color={'#fff'} /> : <FaSearch />}{' '}
            بحــث
          </Button>
          <Button type="button" variation="danger" onClick={() => clearData()}>
            <MdCancel />
            الغاء
          </Button>
        </ButtonGroup>
      </Container>

      {loading && <div style={spinnerStyle}>جاري التحميل...</div>}

      {data.length > 0 && (
        <Container>
          <RunTimeTable
            data={data}
            loading={loading}
            setData={setData}
          />
          <Button disabled={loading} type="button" variation="success" onClick={() => handlePaymentSave()}>
            <BiSolidSave />
            حفـــظ
          </Button>
        </Container>
      )}
      {showRealTable && (
        <Container>
          <RealTable
            gridPaymentData={gridPaymentData}
            loading={loading}
            setGridPaymentData={setGridPaymentData}
  />
        </Container>
      )}
    </>
  );
}

export default PaymentForm;
