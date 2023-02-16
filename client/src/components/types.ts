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
}

export interface ITokens{
    accessToken: string,
    refreshToken: string,
}