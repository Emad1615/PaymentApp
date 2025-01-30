import axios from 'axios';
import { config } from '../config';
import toast from 'react-hot-toast';

export const getBranchesList = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/Branch/GetAll`);
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
    console.log('Error fetching branchs:', error);
    if (error.response.data.errors && error.response.data.errors.length > 0) {
      error.response.data.errors.forEach((error) => { toast.error(error); });
    }
    else { toast.error('حدث خطأ.'); }
    return error.response.data;
  }
};