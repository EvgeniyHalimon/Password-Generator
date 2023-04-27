import { Snackbar, Alert, Paper } from '@mui/material';
import { useState, memo } from 'react';

import { GenerateButton } from '../../components/Button';
import CheckboxBar from '../../components/CheckboxBar/CheckboxBar';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import PasswordLengthSlider from '../../components/PasswordLengthSlider/PasswordLengthSlider';

import { WarningMessages } from '../../types/enums';
import { IPasswordOptions } from '../../types/types';
import { generatePassword } from '../../utils/generatePassword';
import './styles.scss';

const RECOMMENDED_PASSWORD_LENGTH = 16;

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
  
  const [passwordLength, setPasswordLength] = useState<number>(RECOMMENDED_PASSWORD_LENGTH);

  const checkPasswordLength = (passwordLength: number) : void => {
    if (!passwordLength) {
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

  const updatePasswordOption = (field: keyof IPasswordOptions, isChecked: boolean) => {
    setPasswordOptions({ ...passwordOptions, [field] : !isChecked });
  };

  return (
    <Paper className='container' role='password-generator-paper'>
      <PasswordLengthSlider setLength={setPasswordLength} />
      <CheckboxBar
        passwordOptions={passwordOptions}
        updatePasswordOption={updatePasswordOption}
      />
      <GenerateButton title='Generate password' onClick={createPassword} />
      <PasswordInput
        openClipboard={openClipboard}
        setClipboardOpen={setClipboardOpen}
        password={password}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setOptionOpen(false)}
        open={openOption}
      >
        <Alert severity='error' onClose={() => setOptionOpen(false)}>{WarningMessages.OPTION}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        autoHideDuration={2000}
        onClose={() => setLengthOpen(false)}
        open={openLength}
      >
        <Alert severity='warning' onClose={() => setLengthOpen(false)}>{WarningMessages.LENGTH}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default memo(PasswordGenerator);
