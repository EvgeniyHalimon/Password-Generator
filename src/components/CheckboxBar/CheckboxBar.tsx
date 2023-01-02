import { Box, FormGroup, FormLabel } from '@mui/material';
import { FC, memo } from 'react';

import PasswordOption from '../PasswordOption/PasswordOption';

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
  setHasSymbols,
}) => {
  return (
    <FormGroup>
      <FormLabel component='legend'>Choose options</FormLabel>
      <Box>
        <Box>
          <PasswordOption
            flag={hasEngUpperCase}
            setFlag={setHasEngUpperCase}
            label='Allow English upper case letters'
          />
          <PasswordOption
            flag={hasEngLowerCase}
            setFlag={setHasEngLowerCase}
            label='Allow English lower case letters'
          />
          <PasswordOption
            flag={hasCyrUpperCase}
            setFlag={setHasCyrUpperCase}
            label='Allow Cyrillic upper case letters'
          />
        </Box>
        <Box>
          <PasswordOption
            flag={hasCyrLowerCase}
            setFlag={setHasCyrLowerCase}
            label='Allow Cyrillic lower case letters'
          />
          <PasswordOption
            flag={hasNumbers}
            setFlag={setHasNumbers}
            label='Allow numbers'
          />
          <PasswordOption
            flag={hasSymbols}
            setFlag={setHasSymbols}
            label='Allow special symbols'
          />
        </Box>
      </Box>
    </FormGroup>
  );
};

export default memo(CheckboxBar);