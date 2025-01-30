import axios from 'axios';
import {config} from '../config';
import toast from 'react-hot-toast';

// Fetch Education Types
export const getEducationTypeList = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/EducationType/GetAll`);
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
    console.log('Error fetching EducationType:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { toast.error('حدث خطأ.'); }
    return error.response.data;
  }
};
