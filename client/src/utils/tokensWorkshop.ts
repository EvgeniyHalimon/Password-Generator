import { ITokens } from '../components/types';

export const saveTokens = (data: ITokens) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') ?? 'token';
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') ?? 'token';
};