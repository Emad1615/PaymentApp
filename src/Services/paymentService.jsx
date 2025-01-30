import axios from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';

//Check if One Of the Branchs or EducationType Have This Payment Type before
export const CheckBranchsOrEducationTypeHasPaymentType = async ({ paymentTypeId, yearId, branchs, educationTypes }) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("paymentTypeId", paymentTypeId);
    queryParams.append("yearId", yearId);
    branchs.forEach(branch => queryParams.append("branchs", branch));
    educationTypes.forEach(eduType => queryParams.append("educationTypes", eduType));
    const response = await axios.get(`${config.API_BASE_URL}/Payment/GetBranchsOrEducationTypeHasPaymentTypeGrouped?${queryParams.toString()}`);
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

export const getAllPaymentByFilters = async ({ paymentTypeId, educationYearId, branchIds, educationTypeIds }) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/Payment/GetPaymentByFilter`, { paymentTypeId, educationYearId, branchIds, educationTypeIds });
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
    console.log('Error PaymentByFilters:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { toast.error('حدث خطأ.'); }
    return error.response.data;
  }
};

// Save Payment Type
export const createPaymentSettingByList = async (newPayment) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/Payment/CreatePaymentByList`, newPayment);
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


// Edit Payment Type
export const updatePaymentSettingList = async (PaymentList) => {
  try {
    const response = await axios.put(`${config.API_BASE_URL}/Payment/UpdateListOfPayments`, PaymentList);
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

