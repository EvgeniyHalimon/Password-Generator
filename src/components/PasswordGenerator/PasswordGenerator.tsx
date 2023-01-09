import { Snackbar, Alert, Paper } from '@mui/material';
import { useState, memo } from 'react';

import { generatePassword } from '../../utils/generatePassword';
import { GenerateButton } from '../Button';
import CheckboxBar from '../CheckboxBar/CheckboxBar';
import PasswordInput from '../PasswordInput/PasswordInput';
import PasswordLengthSlider from '../PasswordLengthSlider/PasswordLengthSlider';
import './styles.scss';
import { IPasswordOptions } from '../types';


const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>('');
  const [openClipboard, setClipboardOpen] = useState<boolean>(false);
  const [openOption, setOptionOpen] = useState<boolean>(false);
  const [openLength, setLengthOpen] = useState<boolean>(false);

  const options: IPasswordOptions = {
    hasNumbers : false,
    hasSymbols : false,
    hasEngLowerCase : false,
    hasEngUpperCase : false,
    hasCyrLowerCase : false,
    hasCyrUpperCase : false,
  };

  const [passwordOptions, setPasswordOptions] = useState<any>(options);
  
  const [passwordLength, setPasswordLength] = useState<number>(16);

  const checkPasswordLength = (passwordLength: number) : void => {
    if (passwordLength === 0) {
      setLengthOpen(true);
    }
  };

  const isAtLeastOneOptionChoosen = (passwordOptions: IPasswordOptions) => {
    return Object.values(passwordOptions).every(option => option);
  };

  const createPassword = () => {
    if(!isAtLeastOneOptionChoosen){
      setOptionOpen(true);
    }
    checkPasswordLength(passwordLength);
    setPassword(generatePassword(passwordLength, passwordOptions));
  };

  const updatePasswordOption = (field: keyof IPasswordOptions, flag: boolean) => {
    setPasswordOptions({ ...passwordOptions, [field] : flag });
  };

  return (
    <Paper className='container' role='password-generator-paper'>
      <PasswordLengthSlider setLength={setPasswordLength} />
      <PasswordInput
        openClipboard={openClipboard}
        setClipboardOpen={setClipboardOpen}
        password={password}
      />
      <CheckboxBar
        passwordOption={passwordOptions}
        setPasswordOption={updatePasswordOption}
      />
      <GenerateButton title='Generate password' onClick={createPassword} />
      {/* <PasswordInput
        openClipboard={openClipboard}
        setClipboardOpen={setClipboardOpen}
        password={password}
      /> */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setOptionOpen(false)}
        open={openOption}
      >
        <Alert severity='error' onClose={() => setOptionOpen(false)}>You must choose at least 1 option</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        autoHideDuration={2000}
        onClose={() => setLengthOpen(false)}
        open={openLength}
      >
        <Alert severity='warning' onClose={() => setLengthOpen(false)}>Password length must not be 0. Set at least 16</Alert>
      </Snackbar>
    </Paper>
  );
};

export default memo(PasswordGenerator);
