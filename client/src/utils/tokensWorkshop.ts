import { ITokens } from '../types/types';

export const saveTokens = (data: ITokens) => {
  localStorage.setItem('carasique_accessToken', data.accessToken);
  localStorage.setItem('carasique_refreshToken', data.refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('carasique_accessToken');
  localStorage.removeItem('carasique_refreshToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('carasique_refreshToken') ?? '';
};

export const getAccessToken = () => {
  return localStorage.getItem('carasique_accessToken') ?? '';
};