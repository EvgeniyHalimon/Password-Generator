const getCharacters = (length: number, initNumber: number) : string[] => {
  const charactersCodeArray: number[] = Array.from({ length: length }, (_:undefined, i:number) => i + initNumber);
  return charactersCodeArray.map(code => String.fromCharCode(code));
};

export { getCharacters };