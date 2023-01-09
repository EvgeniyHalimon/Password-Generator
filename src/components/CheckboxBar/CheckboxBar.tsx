import { Box, FormGroup, FormLabel } from '@mui/material';
import { FC, memo } from 'react';

import PasswordOption from '../PasswordOption/PasswordOption';
import { PasswordOptionsField, LabelsToPasswordOptions } from '../enums';
import { IPasswordOptions } from '../types';

interface ICheckboxBar{
  passwordOption: IPasswordOptions,
  setPasswordOption: any,
}

const CheckboxBar: FC<ICheckboxBar> = ({ passwordOption, setPasswordOption }) => {
  return (
    <FormGroup role='form-group'>
      <FormLabel component='legend'>Choose options</FormLabel>
      <Box>
        {
          Object.keys(LabelsToPasswordOptions).map((label: string) => {
            const field = LabelsToPasswordOptions[label];
            const flag = passwordOption[field as PasswordOptionsField];
            return(
              <PasswordOption
                key={label}
                flag={flag}
                setFlag={setPasswordOption}
                label={label}
              />
            );
          })
        }
      </Box>
    </FormGroup>
  );
};

export default memo(CheckboxBar);