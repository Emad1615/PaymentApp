import axios from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';

// Fetch All Payment Types
export const getPaymentTypeList = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/GetAll`);
    if (response.data.success) {
      return response.data;
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

// Fetch Payment Type Data
export const getPaymentType = async (id) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/` + id);
    if (response.data.success) {
      return response.data;
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

// Check For Default PaymentType
export const checkDefaultPaymentType = async (exceptId) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/CheckDefaultPaymentTypeExist/` + exceptId);
    if (response.data.success) {
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
export const SavePaymentType = async (newPaymentType) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/PaymentType`, newPaymentType);
    if (response.data.success) {
      return response.data;
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


// Update Payment Type
export const UpdatePaymentType = async (id, updatePaymentType) => {
  try {
    const response = await axios.put(`${config.API_BASE_URL}/PaymentType/` + id, updatePaymentType);
    if (response.data.success) {
      return response.data;
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