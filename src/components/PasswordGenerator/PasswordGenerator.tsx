const PasswordGenerator = () => {
    const numbers: number[] = Array(10).fill(0).map((num:number, i:number) => num + i)
    const initSpecialSymbols: number[] = Array.from(Array(95)).map((_:undefined, i:number) => i + 33) 
    const specialSymbols: string[] = initSpecialSymbols.map(code => String.fromCharCode(code))
    .filter(char => char.match(/^[~`+!@#=$%^&*()_,.<>/?;:'"|/*-]*$/))
    
    
    console.log("🚀 ~ file: PasswordGenerator.tsx ~ line 4 ~ PasswordGenerator ~ specialSymbols", specialSymbols)
    
    return(
        <h1>TEST</h1>
    )
}

export {PasswordGenerator}