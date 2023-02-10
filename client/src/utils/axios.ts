import axios from 'axios';

import { getAccessToken, getRefreshToken } from './tokensWorkshop';

const axiosAbstraction = axios.create({
  baseURL: 'http://localhost:3210',
  headers: {
    'Content-Type': 'application/json',
  },
});
  
export const getDataFromBackend = (url: string): Promise<any> => {
  return axiosAbstraction.get(`${url}`);
};
  
export const postDataToBackend = (url: string, data: any): Promise<any> => {
  return axiosAbstraction.post(`${url}`, data);
};
  
export const putDataToBackend = (url: string, data: any): Promise<any> => {
  return axiosAbstraction.put(`${url}`, data);
};
  
export const deleteDataFromBackend = (url: string): Promise<any> => {
  return axiosAbstraction.delete(`${url}`);
};

axiosAbstraction.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosAbstraction.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const accessToken = await getRefreshToken();
          localStorage.setItem('accessToken', String(accessToken));
          axiosAbstraction.defaults.headers.common['x-access-token'] = accessToken;
          return axiosAbstraction(originalConfig);
        } catch (error: any) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  },
);