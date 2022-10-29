const PasswordGenerator = () => {
    const numbers = Array.from(Array(10)).fill(0).map((num:number, i:number) => num + i)
    console.log(numbers, 'NUMBERS')
    return(
        <h1>TEST</h1>
    )
}

export {PasswordGenerator}