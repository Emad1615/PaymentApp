import axios from 'axios';
import config from '../config';  // Import the config file

// Fetch Payment Types
export const getPaymentTypes = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/PaymentType/GetAll`);  // Use the global API_BASE_URL
    return response.data.data;
  } catch (error)
  {
    console.error('Error fetching PaymentTypes:', error);
    throw error;
  }
};
