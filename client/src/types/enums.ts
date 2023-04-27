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

export enum WarningMessages{
  OPTION = 'You must choose at least 1 option.',
  LENGTH = 'Password length must not be 0. Set at least 16.',
  DELETE_ONE = 'Password successfully deleted',
  DELETE_MANY = 'Passwords successfully deleted',
  ADDED = 'Password successfully added',
  LIMIT = 'You have reach your account limit of passwords',
}

export const staticCheckboxPropsList = [
  { label: Labels.ENG_UPPER, updatedField: PasswordOptionsField.HAS_ENG_UPPER },
  { label: Labels.ENG_LOWER, updatedField: PasswordOptionsField.HAS_ENG_LOWER },
  { label: Labels.CYR_LOWER, updatedField: PasswordOptionsField.HAS_CYR_LOWER },
  { label: Labels.CYR_UPPER, updatedField: PasswordOptionsField.HAS_CYR_UPPER },
  { label: Labels.NUMBERS, updatedField: PasswordOptionsField.HAS_NUMBERS },
  { label: Labels.SYMBOLS, updatedField: PasswordOptionsField.HAS_SYMBOLS },
];