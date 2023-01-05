import { getCharacters } from './getCharacters';

const numbers: number[] = Array(10).fill(0).map((num:number, i:number) => num + i);

const specialSymbols: string[] = getCharacters(95, 33)
  .filter(char => char.match(/^[~`+!@#=$%^&*()_,.<>/?;:'"|/*-]*$/));

const engLowerCaseLetters: string[] = getCharacters(26, 97);

const engUpperCaseLetters: string[] = getCharacters(26, 65);

const cyrillicLowerCaseLetters : string[] = getCharacters(32, 1040);

const cyrillicUpperCaseLetters : string[] = getCharacters(32, 1072);

const getAvailableCharacters = (
  hasNumbers: boolean, 
  hasSymbols: boolean, 
  hasEngLowerCase: boolean, 
  hasEngUpperCase: boolean,
  hasCyrillicLowerCase: boolean, 
  hasCyrillicUpperCase: boolean,
) : (number | string)[] => {
  const availableCharacters = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? specialSymbols : []),
    ...(hasEngLowerCase ? engLowerCaseLetters : []),
    ...(hasEngUpperCase ? engUpperCaseLetters : []),
    ...(hasCyrillicLowerCase ? cyrillicLowerCaseLetters : []),
    ...(hasCyrillicUpperCase ? cyrillicUpperCaseLetters : []),
  ].sort(() => Math.random() - 0.5);

  return availableCharacters;
};

const createPassword = (length:number, availableCharacters: (number | string)[]): string => {
  let password = '';
  if(length === 0) return 'Password length must not be 0. Set at least 16';
  if(availableCharacters.length === 0) return 'You must choose at least 1 option';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    password += availableCharacters[randomIndex];
  }

  return password;
};

export const generatePassword = (
  length: number, 
  hasNumbers: boolean, 
  hasSymbols: boolean, 
  hasEngLowerCase: boolean, 
  hasEngUpperCase: boolean,
  hasCyrillicLowerCase: boolean, 
  hasCyrillicUpperCase: boolean,
) : string => {
  const availableCharacters = getAvailableCharacters(hasNumbers, hasSymbols, hasEngLowerCase, hasEngUpperCase, hasCyrillicLowerCase, hasCyrillicUpperCase);
  return createPassword(length, availableCharacters);
};