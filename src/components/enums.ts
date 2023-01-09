export enum Labels{
    ENG_UPPER = 'Allow English upper case letters',
    ENG_LOWER = 'Allow English lower case letters',
    CYR_LOWER = 'Allow Cyrillic lower case letters',
    CYR_UPPER = 'Allow Cyrillic upper case letters',
    NUMBERS = 'Allow numbers',
    SYMBOLS = 'Allow special symbols',
}

export enum PasswordOptionsField{
    HAS_NUMBERS = 'hasNumbers',
    HAS_SYMBOLS = 'hasSymbols',
    HAS_ENG_LOWER = 'hasEngLowerCase',
    HAS_ENG_UPPER = 'hasEngUpperCase',
    HAS_CYR_UPPER = 'hasCyrUpperCase',
    HAS_CYR_LOWER = 'hasCyrLowerCase',
}

export const LabelsToPasswordOptions : Record<string, string> = {
  [Labels.ENG_UPPER] : PasswordOptionsField.HAS_ENG_UPPER,
  [Labels.ENG_LOWER] : PasswordOptionsField.HAS_ENG_LOWER,
  [Labels.CYR_LOWER] : PasswordOptionsField.HAS_CYR_LOWER,
  [Labels.CYR_UPPER] : PasswordOptionsField.HAS_CYR_UPPER,
  [Labels.NUMBERS] : PasswordOptionsField.HAS_NUMBERS,
  [Labels.SYMBOLS] : PasswordOptionsField.HAS_SYMBOLS,
};