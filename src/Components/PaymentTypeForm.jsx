import Switch from 'react-switch';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import InputSpinner from './../ui/InputSpinner';
import { SavePaymentType, checkDefaultPaymentType } from '../Services/paymentTypeService'; // Import the service functions
import Swal from 'sweetalert2';
import { arabicRegex, englishRegex } from '../config';
import { FaRegSave } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

function PaymentTypeForm() {
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    nameAr: '',
    nameEn: '',
    paymentNumber: ''
  });

  function clearPaymentTypeForm() {
    setNameAr('');
    setNameEn('');
    setPaymentNumber('');
    setIsDefault(false);
    setErrors({
      nameAr: '',
      nameEn: '',
      paymentNumber: ''
    });

  }
  const validateForm = () => {
    let valid = true;
    let errors = {
      nameAr: '',
      nameEn: '',
      paymentNumber: ''
    };

    if (!nameAr.trim()) {
      errors.nameAr = 'اسم نوع الدفع بالعربية مطلوب *';
      valid = false;
    }

    if (!nameEn.trim()) {
      errors.nameEn = 'اسم نوع الدفع بالإنجليزية مطلوب *';
      valid = false;
    }

    if (paymentNumber <= 0 || isNaN(paymentNumber)) {
      errors.paymentNumber = 'عدد الدفعات يجب أن يكون أكبر من 0 *';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleArabicInputChange = (e) => {
    const newNameAr = e.target.value;
    setNameAr(newNameAr);

    if (!arabicRegex.test(newNameAr)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameAr: 'الرجاء إدخال نص باللغة العربية فقط *'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameAr: ''
      }));
    }
  };

  const handleEnglishInputChange = (e) => {
    const newNameEn = e.target.value;
    setNameEn(newNameEn);

    if (!englishRegex.test(newNameEn)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameEn: 'الرجاء إدخال نص باللغة الإنجليزية فقط *'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameEn: ''
      }));
    }
  };


  const handleSave = async () => {

    if (!validateForm()) return;
    if (isDefault) {
      const defaultExists = await checkDefaultPaymentType();
      if (defaultExists) {
        const result = await Swal.fire({
          title: 'هل تريد الاستمرار؟',
          html: "تم العثور على نوع دفع افتراضي موجود بالفعل.<br/> هل ترغب في استبداله؟",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'نعم, استبدال',
          cancelButtonText: 'إلغاء',
        });

        if (!result.isConfirmed) {
          return;
        }
      }
    }

    const newPaymentType = {
      name: nameAr,
      nameEn,
      paymentNo: paymentNumber,
      isDefault,
    };
    setLoading(true);

    const result = await SavePaymentType(newPaymentType);
    console.log(result);
    if (result.success) {
      clearPaymentTypeForm();
      toast.success('تم إضافة نوع الدفع بنجاح');
    }
    setLoading(false);

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label>اسم نوع الدفع بالعربية</label>
      <Input
        type="text"
        value={nameAr}
        onChange={handleArabicInputChange}
      />
      {errors.nameAr && <ErrorText>{errors.nameAr}</ErrorText>}

      <label>اسم نوع الدفع بالإنجليزية</label>
      <Input
        type="text"
        value={nameEn}
        style={{ direction: 'ltr', textAlign: 'right' }}
        onChange={handleEnglishInputChange}
      />
      {errors.nameEn && <ErrorText>{errors.nameEn}</ErrorText>}

      <label>عدد الدفعات</label>
      <InputSpinner value={paymentNumber} setValue={setPaymentNumber} />
      {errors.paymentNumber && <ErrorText>{errors.paymentNumber}</ErrorText>}

      <div style={{ margin: '10px  0px' }}>
        <label style={{
          display: 'inline-flex'
        }}>
          هل هو النوع الافتراضي؟
          <div style={{ margin: '0px 20px' }}>
            <Switch
              checked={isDefault}
              className="react-switch"
              onChange={() => setIsDefault(!isDefault)}
              offColor="#888"
              onColor="#6366f1"
              offHandleColor="#fff"
              onHandleColor="#fff"
              uncheckedIcon={
                <span
                  style={{
                    color: '#fff',
                    marginLeft: '10px',
                    position: 'absolute',
                    top: '3px',
                  }}>
                  {' '}
                  لا{' '}
                </span>
              } // Custom text for OFF state
              checkedIcon={
                <span
                  style={{
                    color: '#fff',
                    marginLeft: '11px',
                    position: 'absolute',
                    top: '1px',
                  }}>
                  {' '}
                  نعم{' '}
                </span>
              } // Custom text for ON state
              height={30} // Larger height
              width={70} // Larger width
            />
          </div>
        </label>
      </div>
      <Button
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? <ClipLoader size={20} color={'#fff'} /> : <FaRegSave />}
        حفظ</Button>
    </div>
  );
}

export default PaymentTypeForm;
