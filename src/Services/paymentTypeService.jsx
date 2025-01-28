import axios from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';

// Fetch All Payment Types
export const getPaymentTypes = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/GetAll`);
    if (response.data.statusCode === 201) {
      return response.data.data;
    } else {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => { toast.error(error); });
      }
      else { toast.error('حدث خطأ.'); }
      return response.data;
    }
  } catch (error) {
    console.log('Error fetching PaymentTypes:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { toast.error('حدث خطأ.'); }
    return error.response.data;
  }
};
// Check For Default PaymentType
export const checkDefaultPaymentType = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/CheckDefaultPaymentTypeExist`); // Modify this if you have a specific endpoint to check for defaults
    if (response.data.statusCode === 201) {
      return response.data.data;
    } else {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => { toast.error(error); });
      }
      else { toast.error('حدث خطأ.'); }
      return response.data;
    }
  } catch (error) {
    console.log('Error CheckDefault Payment:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { toast.error('حدث خطأ.'); }
    return error.response.data;
  }
};

// Save Payment Type
export const handleSavePaymentType = async (newPaymentType) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/PaymentType`, newPaymentType);
    if (response.data.statusCode === 201) {
      toast.success('تم إضافة نوع الدفع بنجاح');
      return response.data.data;
    } else {
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => { toast.error(error); });
      }
      else { 
        toast.error('حدث خطأ.'); 
      }
      return response.data;
    }
  } catch (error) {
    console.log('Error Saveing PaymentTypes:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { 
      toast.error('حدث خطأ.'); 
    }
    return error.response.data;
  }
};