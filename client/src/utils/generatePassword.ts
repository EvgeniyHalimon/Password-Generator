import { WarningMessages } from '../types/enums';
import { IPasswordOptions } from '../types/types';

import { getCharacters } from './getCharacters';

const numbers: number[] = Array(10).fill(0).map((num:number, i:number) => num + i);

const specialSymbols: string[] = getCharacters(95, 33)
  .filter(char => char.match(/^[~`+!@#=$%^&*()_,.<>/?;:'"|/*-]*$/));

const engLowerCaseLetters: string[] = getCharacters(26, 97);

const engUpperCaseLetters: string[] = getCharacters(26, 65);

const cyrillicUpperCaseLetters : string[] = getCharacters(32, 1040);

const cyrillicLowerCaseLetters : string[] = getCharacters(32, 1072);

const getAvailableCharacters = (
  passwordOptions: IPasswordOptions,
) : (number | string)[] => {
  const availableCharacters = [
    ...(passwordOptions.hasNumbers ? numbers : []),
    ...(passwordOptions.hasSymbols ? specialSymbols : []),
    ...(passwordOptions.hasEngLowerCase ? engLowerCaseLetters : []),
    ...(passwordOptions.hasEngUpperCase ? engUpperCaseLetters : []),
    ...(passwordOptions.hasCyrLowerCase ? cyrillicLowerCaseLetters : []),
    ...(passwordOptions.hasCyrUpperCase ? cyrillicUpperCaseLetters : []),
  ].sort(() => Math.random() - 0.5);

  return availableCharacters;
};

const createPassword = (length:number, availableCharacters: (number | string)[]): string => {
  let password = '';
  if(!length) return WarningMessages.LENGTH;
  if(!availableCharacters.length) return WarningMessages.OPTION;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    password += availableCharacters[randomIndex];
  }

  return password;
};

export const generatePassword = (
  length: number, 
  passwordOptions: IPasswordOptions,
) : string => {
  const availableCharacters = getAvailableCharacters(passwordOptions);
  return createPassword(length, availableCharacters);
};