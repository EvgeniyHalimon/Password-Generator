import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import { BASE_URL, REFRESH } from '../constants/backendConstants';

import { getAccessToken, /* getRefreshToken, */ saveTokens } from './tokensWorkshop';

let accessToken = getAccessToken() ? getAccessToken() : null;
console.log('🚀 ~ file: axios.ts:10 ~ accessToken', accessToken);

const axiosAbstraction = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`, 
  },
},
);

axiosAbstraction.interceptors.request.use(async req => {
  if(!accessToken){
    console.log('🚀 ~ file: axios.ts:39 ~ accessToken', accessToken);
    accessToken = getAccessToken() !== null ? getAccessToken() : null;
    console.log('🚀 ~ file: axios.ts:41 ~ accessToken', accessToken);
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  const user: any = jwt_decode(String(accessToken));
  console.log('🚀 ~ file: axios.ts:43 ~ user', user);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if(!isExpired) return req;

  const response = await axios.get(REFRESH);

  saveTokens(response.data);
  req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return req;
});