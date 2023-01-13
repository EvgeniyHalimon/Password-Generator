import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Box, IconButton, Snackbar, TextField } from '@mui/material';
import { memo, useRef, FC } from 'react';

import './style.scss';

interface IPasswordInput{
  openClipboard: boolean
  setClipboardOpen: (value: boolean) => void,
  password: string
}

export async function copyTextToClipboard(password:string, setClipboardOpen: any) {
  if ('clipboard' in navigator) {
    setClipboardOpen(true);
    return await navigator.clipboard.writeText(password);
  } else {
    setClipboardOpen(true);
    return document.execCommand('copy', true, password);
  }
}

const PasswordInput: FC<IPasswordInput> = ({ openClipboard, setClipboardOpen, password }) => {
  const ref = useRef<any>(null);

  const handleClick = (e:any) => {
    ref.current.select();
  };

  return (
    <>
      <Box className='container-box' role='container'>
        <TextField 
          className='container-box-input' 
          value={password} 
          ref={ref}
          role='textfield'
        />
        <IconButton 
          className='container-box-icon-button' 
          onClick={() => copyTextToClipboard(password, setClipboardOpen)} 
          onFocus={(e: any) => handleClick(e)}
        >
          <ContentCopyIcon role='copy-icon'/>
        </IconButton>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => setClipboardOpen(false)}
        open={openClipboard}
        role='alert-container'
        sx={{
          '& .MuiSnackbarContent-message': {
            margin: '0 auto',
          },
        }}
      >
        <Alert color='success'>Copied to clipboard</Alert>
      </Snackbar>
    </>
  );
};

export default memo(PasswordInput);