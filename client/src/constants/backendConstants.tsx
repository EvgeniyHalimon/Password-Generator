import { IQueries } from '../types/types';

export const BASE_URL = 'http://localhost:3210';

enum Routes {
    auth = '/auth',
    users = '/users',
    password = '/password'
}

//auth

export const LOGIN = `${Routes.auth}/login`;
export const REGISTER = `${Routes.auth}/register`;
export const REFRESH = `${Routes.auth}/refresh`;

// users

export const GET_ALL_USERS = Routes.users;
//same link for DELETE request
export const GET_USER = (id: string): string => `${Routes.users}/${id}`;

// passwords

export const PASSWORDS = `${Routes.password}`;

// post/put/delete

export const PASSWORD = `${PASSWORDS}/`;


export const DELETE_PASSWORDS = `${PASSWORDS}/delete`;

export const GET_PASSWORDS = (queries : IQueries): string => {
  return `${PASSWORDS}?search=${queries.search}&page=${queries.page}&limit=${queries.limit}&sortBy=${queries.sortBy}&sort=${queries.sort}`;
};

export const DECRYPT_PASSWORDS = `${PASSWORDS}/display`;