import { useEffect } from "react"
import { getCharacters } from "../../utils/getCharacters"

const PasswordGenerator = () => {
    const numbers: number[] = Array(10).fill(0).map((num:number, i:number) => num + i)

    const specialSymbols: string[] = getCharacters(95, 33)
    .filter(char => char.match(/^[~`+!@#=$%^&*()_,.<>/?;:'"|/*-]*$/))

    const engLowerCaseLetters: string[] = getCharacters(26, 97)

    const engUpperCaseLetters: string[] = getCharacters(26, 65)

    const cyrillicUpperCaseLetters : string[] = getCharacters(32, 1040)

    const cyrillicLowerCaseLetters : string[] = getCharacters(32, 1072)
    
    const generatePassword = (
        length: number, 
        hasNumbers: boolean, 
        hasSymbols: boolean, 
        hasEngLowerCase: boolean, 
        hasEngUpperCase: boolean,
        hasCyrillicLowerCase: boolean, 
        hasCyrillicUpperCase: boolean,
    ) : string => {

        const availableCharacters = [
            ...(hasNumbers ? numbers : []),
            ...(hasSymbols ? specialSymbols : []),
            ...(hasEngLowerCase ? engLowerCaseLetters : []),
            ...(hasEngUpperCase ? engUpperCaseLetters : []),
            ...(hasCyrillicLowerCase ? cyrillicLowerCaseLetters : []),
            ...(hasCyrillicUpperCase ? cyrillicUpperCaseLetters : []),
        ]

        if(availableCharacters.length === 0) return 'You must choose at least 1 option'

        const password: string = availableCharacters.reduce((accum: string) => {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length)
            return accum + availableCharacters[randomIndex]
        },'')

        return password
    }

    useEffect(() => {
        console.log(generatePassword(100, true, true, true, true, true, true))
    },[])
    
    return(
        <h1>TEST</h1>
    )
}

export {PasswordGenerator}