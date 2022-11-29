import { useState, useRef, memo } from "react";
import { Box, Snackbar, Alert } from "@mui/material"

import { GenerateButton } from "../Button";
import CheckboxBar from "../CheckboxBar/CheckboxBar";
import PasswordLengthSlider from "../PasswordLengthSlider/PasswordLengthSlider";
import PasswordInput from "../PasswordInput/PasswordInput";
import { generatePassword } from "../../utils/generatePassword";
import './styles.scss'

const PasswordGenerator = () => {

    const ref = useRef<any>(null)

    const [password, setPassword] = useState<string>('')
    const [openClipboard, setClipboardOpen] = useState<boolean>(false);
    const [openOption, setOptionOpen] = useState<boolean>(false);
    const [openLength, setLengthOpen] = useState<boolean>(false);
    
    const [passwordLength, setPasswordLength] = useState<number>(16)
    const [hasNumbers, setHasNumbers] = useState<boolean>(false)
    const [hasSymbols, setHasSymbols] = useState<boolean>(false)
    const [hasEngLowerCase, setHasEngLowerCase] = useState<boolean>(false)
    const [hasEngUpperCase, setHasEngUpperCase] = useState<boolean>(false)
    const [hasCyrLowerCase, setHasCyrLowerCase] = useState<boolean>(false)
    const [hasCyrUpperCase, setHasCyrUpperCase] = useState<boolean>(false)

    const createPassword = () => {
        if(!hasNumbers && !hasSymbols && !hasEngLowerCase && !hasEngUpperCase && !hasCyrLowerCase && !hasCyrUpperCase){
            setOptionOpen(true);
        }
        if(passwordLength === 0){
            setLengthOpen(true);
        }
        setPassword(generatePassword(passwordLength, hasNumbers, hasSymbols, hasEngLowerCase, hasEngUpperCase, hasCyrLowerCase, hasCyrUpperCase))
    }

    return(
        <Box className="container">
            <PasswordLengthSlider setLength={setPasswordLength}/>
            <CheckboxBar 
                hasEngUpperCase={hasEngUpperCase} setHasEngUpperCase={setHasEngUpperCase} 
                hasEngLowerCase={hasEngLowerCase} setHasEngLowerCase={setHasEngLowerCase} 
                hasCyrUpperCase={hasCyrUpperCase} setHasCyrUpperCase={setHasCyrUpperCase} 
                hasCyrLowerCase={hasCyrLowerCase} setHasCyrLowerCase={setHasCyrLowerCase} 
                hasNumbers={hasNumbers} setHasNumbers={setHasNumbers} 
                hasSymbols={hasSymbols} setHasSymbols={setHasSymbols}            
            />
            <GenerateButton title='Generate password' onClick={createPassword}/>
            <PasswordInput 
                openClipboard={openClipboard} 
                setClipboardOpen={setClipboardOpen} 
                password={password}
            />
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={2000}
              onClose={() => setOptionOpen(false)}
              open={openOption}
            >
                <Alert severity="error" onClose={() => setOptionOpen(false)}>You must choose at least 1 option</Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              autoHideDuration={2000}
              onClose={() => setLengthOpen(false)}
              open={openLength}
            >
                <Alert severity="warning" onClose={() => setLengthOpen(false)}>Password length must not be 0. Set at least 16</Alert>
            </Snackbar>
        </Box>
    )
}

export default memo(PasswordGenerator)