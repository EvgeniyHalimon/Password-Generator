import { useState, useRef, MutableRefObject } from "react";
import { Box, IconButton, Slider, TextField, Snackbar, Typography } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { CheckboxBar } from "../CheckboxBar";
import { GenerateButton } from "../Button";
import { generatePassword } from "../../utils/generatePassword";
import './styles.scss'

const PasswordGenerator = () => {

    const ref = useRef<any>(null)
    console.log("🚀 ------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: PasswordGenerator.tsx ~ line 13 ~ PasswordGenerator ~ ref", ref)
    console.log("🚀 ------------------------------------------------------------------------🚀")

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
    
    const handleClick = (e:any) => {
        ref.current.select();
    };

    const createPassword = () => {
        if(!hasNumbers && !hasSymbols && !hasEngLowerCase && !hasEngUpperCase && !hasCyrLowerCase && !hasCyrUpperCase){
            setOptionOpen(true);
        }
        if(passwordLength === 0){
            setLengthOpen(true);
        }
        setPassword(generatePassword(passwordLength, hasNumbers, hasSymbols, hasEngLowerCase, hasEngUpperCase, hasCyrLowerCase, hasCyrUpperCase))
    }
    
    async function copyTextToClipboard(password:string) {
        if ('clipboard' in navigator) {
            setClipboardOpen(true);
            return await navigator.clipboard.writeText(password);
        } else {
            setClipboardOpen(true);
            return document.execCommand('copy', true, password);
        }
      }

    return(
        <Box className="container">
            <Typography component='h1'>Password length</Typography>
            <Slider
                valueLabelDisplay="auto"
                defaultValue={16}
                onChange={(e: any) => {
                    setPasswordLength(e.target.value);
                }}
            />
            <CheckboxBar 
                hasEngUpperCase={hasEngUpperCase} setHasEngUpperCase={setHasEngUpperCase} 
                hasEngLowerCase={hasEngLowerCase} setHasEngLowerCase={setHasEngLowerCase} 
                hasCyrUpperCase={hasCyrUpperCase} setHasCyrUpperCase={setHasCyrUpperCase} 
                hasCyrLowerCase={hasCyrLowerCase} setHasCyrLowerCase={setHasCyrLowerCase} 
                hasNumbers={hasNumbers} setHasNumbers={setHasNumbers} 
                hasSymbols={hasSymbols} setHasSymbols={setHasSymbols}            
            />
            <GenerateButton title='Generate password' onClick={createPassword}/>
            <Box className="container-box">
                <input className="container-box-input" value={password} ref={ref}/>
                <IconButton onClick={() => copyTextToClipboard(password)} onFocus={(e: any) => handleClick(e)}>
                    <ContentCopyIcon/>
                </IconButton>
            </Box>
            <Snackbar
              message="Copied to clibboard"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setClipboardOpen(false)}
              open={openClipboard}
            />
            <Snackbar
              message="You must choose at least 1 option"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setOptionOpen(false)}
              open={openOption}
            />
            <Snackbar
              message="Password length must not be 0. Set at least 16"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setLengthOpen(false)}
              open={openLength}
            />
        </Box>
    )
}

export {PasswordGenerator}