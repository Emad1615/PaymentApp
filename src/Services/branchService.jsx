
import axios from 'axios';
import config from '../config';

export const getBranches = async () =>
{
  try
  {
    const response = await axios.get(`${config.API_BASE_URL}/Branch/GetAll`);
    return response.data.data;
  } catch (error)
  {
    console.error('Error fetching Branches:', error);
    throw error;
  }
};