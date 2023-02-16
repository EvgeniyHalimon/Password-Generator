export const BASE_URL = 'http://localhost:3210';

enum Routes {
    auth = '/auth',
    users = '/users'
}

//auth

export const LOGIN = `${Routes.auth}/login`;
export const REGISTER = `${Routes.auth}/register`;
export const REFRESH = `${Routes.auth}/refresh`;

// users

export const GET_ALL_USERS = Routes.users;
//same link for DELETE request
export const GET_USER = (id: string) => `${Routes.users}/${id}`;
