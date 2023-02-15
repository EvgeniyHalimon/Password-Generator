import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { BASE_URL, REFRESH } from '../constants/backendConstants';
import { getAccessToken, saveTokens, getRefreshToken } from '../utils/tokensWorkshop';

const useAxios = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`, 
    },
  });

  const getDataFromBackend = (url: string): Promise<any> => {
    return axiosInstance.get(`${url}`);
  };
    
  const postDataToBackend = (url: string, data: any): Promise<any> => {
    return axiosInstance.post(`${url}`, data);
  };
    
  const putDataToBackend = (url: string, data: any): Promise<any> => {
    return axiosInstance.put(`${url}`, data);
  };
    
  const deleteDataFromBackend = (url: string): Promise<any> => {
    return axiosInstance.delete(`${url}`);
  };
  
  axiosInstance.interceptors.request.use(async req => {
    const user: any = jwt_decode(accessToken);
    console.log('🚀 ~ file: useAxios.tsx:37 ~ useAxios ~ user', user);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
    if(!isExpired) return req;
    
    const response = await axios({
      method: 'GET',
      url: REFRESH,
      headers: {
        Authorization: `Bearer ${refreshToken}`, 
      },
    });
        
    saveTokens(response.data);
        
    req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    return req;
  });
    
  return { getDataFromBackend, postDataToBackend, putDataToBackend, deleteDataFromBackend };
};

export default useAxios;
