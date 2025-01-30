import axios from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';

//Check if One Of the Branchs or EducationType Have This Payment Type before
export const CheckBranchsOrEducationTypeHasPaymentType = async ({ paymentTypeId, yearId, branchs, educationTypes }) => {
  try {

    const response = await axios.get(`${config.API_BASE_URL}/Payment/GetBranchsOrEducationTypeHasPaymentTypeGrouped`, { params: { paymentTypeId, yearId, branchs: branchs.join('&branchs='), educationTypes: educationTypes.join('&educationTypes=') } });
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


export const getPaymentToEdit = async ({ branchId, educationTypeId, paymentTypeId, educationYearId }) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/Payment/GetPaymentByFilter?paymentTypeId=${paymentTypeId}&educationYearId=${educationYearId}
      &branchIds=${branchId}&educationTypeIds=${educationTypeId}`);
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
    // const params = {
    //   paymentTypeId,
    //   educationYearId,
    //   ...(branchIds.length > 0 &&  { branchIds: branchIds.join('&branchIds=') }), 
    //   ...(educationTypeIds.length > 0 && { educationTypeIds: educationTypeIds.join('&educationTypeIds=') }) 
    // };
    // const response = await axios.get(`${config.API_BASE_URL}/Payment/GetPaymentByFilter`, { params: params });

    const queryParams = new URLSearchParams();
    (paymentTypeId && queryParams.append("paymentTypeId", paymentTypeId));
    (educationYearId && queryParams.append("educationYearId", educationYearId));
    (branchIds.length > 0 && branchIds.forEach(branch => queryParams.append("branchIds", branch)));
    (educationTypeIds.length > 0 && educationTypeIds.forEach(eduType => queryParams.append("educationTypeIds", eduType)));
    const response = await axios.get(`${config.API_BASE_URL}/Payment/GetPaymentByFilter?${queryParams.toString()}`);
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
export const createPaymentSettingByList = async (newPaymentType) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/Payment/CreatePaymentByList`, newPaymentType);
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

