import axios from 'axios';

import { BASE_URL, REFRESH } from '../constants/backendConstants';
import { getAccessToken, saveTokens, getRefreshToken, removeTokens } from '../utils/tokensWorkshop';

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

  const getDataFromBackend = (url: string,data?: any): Promise<any> => {
    return axiosInstance.get(`${url}`, data);
  };
    
  const postDataToBackend = (url: string, data: any): Promise<any> => {
    return axiosInstance.post(`${url}`, data);
  };
    
  const putDataToBackend = (url: string, data: any): Promise<any> => {
    return axiosInstance.put(`${url}`, data);
  };
    
  const deleteDataFromBackend = (url: string, data?: any): Promise<any> => {
    return axiosInstance.delete(`${url}`, data);
  };

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalRequest = err.config;
      axiosInstance.defaults.headers['Authorization'] =  `Bearer ${refreshToken}`;
      if (err.response.status === 403 && err.response) {
        try {
          const response = await getDataFromBackend(REFRESH);
          if (response?.status === 200) {
            saveTokens(response.data);
            return axiosInstance({
              ...originalRequest,
              headers: { ...originalRequest.headers, Authorization: `Bearer ${response.data.accessToken}` },
            });
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            removeTokens();
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
    },
  );
    
  return { getDataFromBackend, postDataToBackend, putDataToBackend, deleteDataFromBackend };
};

export default useAxios;