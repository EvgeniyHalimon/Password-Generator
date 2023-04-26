export interface IPasswordOptions {
    hasNumbers : boolean,
    hasSymbols : boolean,
    hasEngLowerCase : boolean,
    hasEngUpperCase : boolean,
    hasCyrLowerCase : boolean,
    hasCyrUpperCase : boolean,
}

export interface IFormInput{
    id: string,
    name: string,
    label: string,
    type: 'text' | 'password' | 'email',
    value: string,
    onChange: any,
    error: undefined | boolean,
    helperText: string | undefined | boolean,
    hasIcon?: boolean
}

export interface ITokens{
    accessToken: string,
    refreshToken: string,
}

export type OrderOption = 'asc' |'desc'

export interface IQueries{
    search:string,
    page: string | number,
    limit: number,
    sortBy: string,
    sort: OrderOption
}

export interface ITablehead {
    applicationName: string,
    password: string,
}

export interface HeadCells {
  id: keyof ITablehead,
  label: string
}

export interface ITableToolbar {
  numSelected: number,
  passwords: string[],
  setSelected(value: string[]): void,
  setSearch(value: string): void,
  fetchFunc: any,
  accounts: any,
  setAccounts: any
}

export interface IEncryptedPassword{
    iv: string,
    password: string,
    _id?: string
}

export interface IPasswordObject{
    _id: string,
    userId: string,
    password: IEncryptedPassword | string,
    applicationName: string
}