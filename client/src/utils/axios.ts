import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3210';

const axiosAbstraction = () => {
  return axios;
};
  
export const getDataFromBackend = (url: string): Promise<any> => {
  return axiosAbstraction().get(`${url}`);
};
  
export const postDataToBackend = (url: string, data: any): Promise<any> => {
  return axiosAbstraction().post(`${url}`, data);
};
  
export const putDataToBackend = (url: string, data: any): Promise<any> => {
  return axiosAbstraction().put(`${url}`, data);
};
  
export const deleteDataFromBackend = (url: string): Promise<any> => {
  return axiosAbstraction().delete(`${url}`);
};