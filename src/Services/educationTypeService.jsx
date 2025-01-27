import axios from 'axios';
import config from '../config';

// Fetch Education Types
export const getEducationTypes = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/EducationType/GetAll`);
    return response.data.data;
  } catch (error)
  {
    console.error('Error fetching EducationTypes:', error);
    throw error;
  }
};
