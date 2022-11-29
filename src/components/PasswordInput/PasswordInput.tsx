import {memo, useRef, FC} from 'react'
import { Box, IconButton, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './style.scss'

interface IPasswordInput{
    openClipboard: boolean
    setClipboardOpen: (value: boolean) => void,
    password: string
}

const PasswordInput: FC<IPasswordInput> = ({openClipboard, setClipboardOpen, password}) => {
    const ref = useRef<any>(null)

    const handleClick = (e:any) => {
        ref.current.select();
    };

    async function copyTextToClipboard(password:string) {
        if ('clipboard' in navigator) {
            setClipboardOpen(true);
            return await navigator.clipboard.writeText(password);
        } else {
            setClipboardOpen(true);
            return document.execCommand('copy', true, password);
        }
    }

    return (
      <>
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
          sx={{
            '& .MuiSnackbarContent-message': {
                margin: '0 auto'
            }
          }}
        />
      </>
    )
}

export default memo(PasswordInput)