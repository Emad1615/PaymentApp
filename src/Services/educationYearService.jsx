import axios from 'axios';
import config from '../config';  // Import the config file

// Fetch Education Years
export const getEducationYears = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/EducationYear/GetAll`);
    return response.data.data;
  } catch (error)
  {
    console.error('Error fetching EducationYears:', error);
    throw error;
  }
};
