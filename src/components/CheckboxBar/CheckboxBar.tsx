import { FC } from "react"
import { Box, Checkbox, FormGroup, FormControlLabel, FormLabel } from "@mui/material"

interface ICheckboxBar{
    hasEngUpperCase: boolean,
    setHasEngUpperCase: any,
    hasEngLowerCase: boolean,
    setHasEngLowerCase: any,
    hasCyrUpperCase: boolean,
    setHasCyrUpperCase: any,
    hasCyrLowerCase: boolean,
    setHasCyrLowerCase: any,
    hasNumbers: boolean,
    setHasNumbers: any,
    hasSymbols: boolean,
    setHasSymbols: any,
}

const CheckboxBar: FC<ICheckboxBar> = ({
    hasEngUpperCase,
    setHasEngUpperCase,
    hasEngLowerCase,
    setHasEngLowerCase,
    hasCyrUpperCase,
    setHasCyrUpperCase,
    hasCyrLowerCase,
    setHasCyrLowerCase,
    hasNumbers,
    setHasNumbers,
    hasSymbols,
    setHasSymbols
}) => {
    return (
        <FormGroup>
            <FormLabel component="legend">Choose options</FormLabel>
            <Box>
                <Box>
                    <FormControlLabel 
                        control={<Checkbox checked={hasEngUpperCase}/>}
                        onClick={() => setHasEngUpperCase(!hasEngUpperCase)} 
                        label="Allow English upper case letters" 
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={hasEngLowerCase}/>} 
                        onClick={() => setHasEngLowerCase(!hasEngLowerCase)}
                        label="Allow English lower case letters" 
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={hasCyrUpperCase}/>} 
                        onClick={() => setHasCyrUpperCase(!hasCyrUpperCase)}
                        label="Allow Cyrillic upper case letters" 
                    />
                </Box>
                <Box>
                    <FormControlLabel 
                        control={<Checkbox checked={hasCyrLowerCase}/>} 
                        onClick={() => setHasCyrLowerCase(!hasCyrLowerCase)}
                        label="Allow Cyrillic lower case letters" 
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={hasNumbers}/>} 
                        onClick={() => setHasNumbers(!hasNumbers)}
                        label="Allow numbers" 
                    />
                    <FormControlLabel 
                        control={<Checkbox checked={hasSymbols}/>} 
                        onClick={() => setHasSymbols(!hasSymbols)}
                        label="Allow special symbols" 
                    />
                </Box>
            </Box>
        </FormGroup>
    )
}

export {CheckboxBar}