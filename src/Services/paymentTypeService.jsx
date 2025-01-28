import axios from 'axios';
import { config } from '../config';  

// Fetch All Payment Types
export const getPaymentTypes = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/GetAll`);  
    return response.data.data;
  } catch (error)
  {
    console.error('Error fetching PaymentTypes:', error);
    throw error;
  }
};
// Check For Default PaymentType
export const checkDefaultPaymentType = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/CheckDefaultPaymentTypeExist`); // Modify this if you have a specific endpoint to check for defaults
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Save Payment Type
export const handleSavePaymentType = async (newPaymentType) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/PaymentType/Create`, newPaymentType);
    return response.data;
  } catch (error) {
    console.error('Error saving payment type:', error);
    throw error; 
  }
};