export interface ILoginService{
    userRoles: any
    accessToken: any
    refreshToken: any
}

export interface INewUserData{
    username: string, 
    password: string, 
    email: string, 
    innerPassword: string,
}