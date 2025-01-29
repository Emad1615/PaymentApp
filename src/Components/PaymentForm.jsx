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
import { CheckBranchsOrEducationTypeHasPaymentType, createPaymentSettingByList } from '../Services/paymentService';
import Swal from 'sweetalert2';
import { getPaymentTypes } from '../Services/paymentTypeService';

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
function PaymentForm()
{
  const [paymentType, setPaymentType] = useState(null);
  const [year, setYear] = useState(null);
  const [branchs, setBranchs] = useState([]);
  const [educationTypes, setEducationTypes] = useState([]);
  const [data, setData] = useState([]);
  const [realData, setRealData] = useState([]);
  const [showRealTable, setShowRealTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentList, setPaymentList] = useState([]); 
  const [yearList, setYearsList] = useState([]);
  const [branchList, setBrancheList] = useState([]); 
  const [educationTypeList, setEducationTypeList] = useState([]);

  function handleAddPayment()
  {
    if (!paymentType || !year || !branchs.length || !educationTypes.length)
    {
      toast.error(`يجب اختيار نوع الدفع والعام الدراسي والفروع ونوع التعليم`);
      return;
    }
    // if (data.length === paymentType.number)
    // {
    //   toast.error(`تم اضافة الدفعات بالفعل`);
    //   return;
    // }
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
    setRealData([]);
    setShowRealTable(false);
    setLoading(false);
  }

  function handleRealPayment()
  {
    setLoading(true);
    setTimeout(() =>
    {
      setRealData(PaymentSettings);
      setData([]);
      setShowRealTable(true);
      setLoading(false);
    }, 2000);
  }

  async function handlePaymentSave()
  {
    const checkPaymentData = {
      paymentTypeId: paymentType.value,
      yearId: year.value,
      branchs: branchs.map(item => item.value),
      educationTypes: educationTypes.map(item => item.value)
    };
    //Check if One Of the Branchs or EducationType has this Payment Type before
    const response = await CheckBranchsOrEducationTypeHasPaymentType(checkPaymentData);
    if (response.success)
    {
      if (response.data.length > 0)
      {
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
        if (!result.isConfirmed)
        {
          return;
        }
      }
    } else
    {
      return;
    }


    setLoading(true);
    const createPaymentSettingData = data.map(item =>
    {
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
    if (result.success)
    {
      toast.success('تم إضافة أنظمة الدفع بنجاح');
      clearData();
    }
    setLoading(false);

  }

  function clearData()
  {
    setPaymentType(null);
    setYear(null);
    setBranchs(null);
    setEducationTypes([]);
    setData([]);
    setRealData([]);
    setShowRealTable(false);
  }
  useEffect(()=>{

    const getPaymentList = async () => {
      const response = await getPaymentTypes();
      if (response.success) {
        setPaymentList(response.data.map(item => ({ value: item.id, label: item.name })));
      }
    }
    const getYearsList = async () => {
      const response = await getYearsList();
      if (response.success) {
        setYearsList(response.data.map(item => ({ value: item.id, label: item.year })));
      }
    }
    const getBranchList = async () => {
      const response = await getBranchList();
      if (response.success) {
        setBrancheList(response.data.map(item => ({ value: item.id, label: item.name })));
      }
    }
    const getEducationTypeList = async () => {
      const response = await getEducationTypeList();
      if (response.success) {
        setEducationTypeList(response.data.map(item => ({ value: item.id, label: item.name })));
      }
    }
    getPaymentList();
    getYearsList();
    getBranchList();
    getEducationTypeList();
  },[])
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
          <AddPaymentTypeModal paymentType={paymentType} setPaymentType={setPaymentType} />
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
          <RunTimeTable
            data={realData}
            loading={loading}
            setData={setRealData}
          />
        </Container>
      )}
    </>
  );
}

export default PaymentForm;

const paymentTypes = [
  { value: 1, label: 'دفعة واحدة', number: 1 },
  { value: 2, label: 'دفعتين ', number: 2 },
  { value: 3, label: '3 دفعات', number: 3 },
];
const Years = [
  { value: 1, label: 2024 },
  { value: 2, label: 2025 },
  { value: 3, label: 2026 },
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
  {
    value: 1,
    educationTypeId: 1,
    educationType: 'اهلي',
    branchId: 1,
    branch: 'فرع 1',
    yearId: 1,
    year: 2025,
    paymentTypeId: 2,
    paymentType: 'دفعتين',
    percentage: 50,
    startDate: '2025-01-01',
    endDate: '2025-01-31',
  },
  {
    value: 2,
    educationTypeId: 1,
    educationType: 'اهلي',
    branchId: 1,
    branch: 'فرع 1',
    yearId: 1,
    year: 2025,
    paymentTypeId: 2,
    paymentType: 'دفعتين',
    percentage: 50,
    startDate: '2025-02-01',
    endDate: '2025-03-31',
  },
];
