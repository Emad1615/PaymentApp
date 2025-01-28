import Switch from 'react-switch';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import InputSpinner from './../ui/InputSpinner';
import { handleSavePaymentType, checkDefaultPaymentType } from '../Services/paymentTypeService'; // Import the service functions
import Swal from 'sweetalert2'; 
import { arabicRegex, englishRegex } from '../config';

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
  const [errors, setErrors] = useState({
    nameAr: '',
    nameEn: '',
    paymentNumber: ''
  });

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
  // const validateForm = () => {
  //   if (!nameAr.trim()) {
  //     toast.error('اسم نوع الدفع بالعربية مطلوب');
  //     return false;
  //   }
  //   if (!nameEn.trim()) {
  //     toast.error('اسم نوع الدفع بالإنجليزية مطلوب');
  //     return false;
  //   }
  //   if (paymentNumber <= 0 || isNaN(paymentNumber)) {
  //     toast.error('عدد الدفعات يجب أن يكون أكبر من 0');
  //     return false;
  //   }
  //   return true;
  // };


  // Handle Arabic input change and validate
  const handleArabicInputChange = (e) => {
    const newNameAr = e.target.value;
    setNameAr(newNameAr);

    // Check if the input contains only Arabic characters (and spaces)
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
      nameE:nameAr,
      nameEn,
      paymentNo:paymentNumber,
      isDefault,
    };
    const result = await handleSavePaymentType(newPaymentType);  
    console.log(result);  
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
      <InputSpinner  value={paymentNumber} setValue={setPaymentNumber} />
      {errors.paymentNumber && <ErrorText>{errors.paymentNumber}</ErrorText>}  

      
      <label>هل هو النوع الافتراضي؟</label>
      <div>
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
      <Button onClick={handleSave}>حفظ</Button>
    </div>
  );
}

export default PaymentTypeForm;
