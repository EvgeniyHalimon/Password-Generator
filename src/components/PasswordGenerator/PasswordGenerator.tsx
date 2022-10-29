import { getCharacters } from "../../utils/getCharacters"

const PasswordGenerator = () => {
    const numbers: number[] = Array(10).fill(0).map((num:number, i:number) => num + i)

    const specialSymbols: string[] = getCharacters(95, 33)
    .filter(char => char.match(/^[~`+!@#=$%^&*()_,.<>/?;:'"|/*-]*$/))

    const engLowerCaseLetters: string[] = getCharacters(26, 97)

    const engUpperCaseLetters: string[] = getCharacters(26, 65)

    const cyrillicLowerCaseLetters : string[] = getCharacters(32, 1040)

    const cyrillicUpperCaseLetters : string[] = getCharacters(32, 1072)
    
    
    return(
        <h1>TEST</h1>
    )
}

export {PasswordGenerator}