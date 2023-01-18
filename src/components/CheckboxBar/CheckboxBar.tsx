import { Box, FormGroup, FormLabel } from '@mui/material';
import { FC, memo } from 'react';

import PasswordOption from '../PasswordOption/PasswordOption';
import { staticCheckboxPropsList } from '../enums';
import { IPasswordOptions } from '../types';

interface ICheckboxBar{
  passwordOptions: IPasswordOptions,
  updatePasswordOption: any,
}

const CheckboxBar: FC<ICheckboxBar> = ({ passwordOptions, updatePasswordOption }) => {
  return (
    <FormGroup role='form-group'>
      <FormLabel component='legend'>Choose options</FormLabel>
      <Box>
        {
          staticCheckboxPropsList.map(({ label, updatedField }) => (
            <PasswordOption
              key={label}
              isChecked={passwordOptions[updatedField]}
              updatedField={updatedField}
              updatePasswordOption={updatePasswordOption}
              label={label}
            />
          ))
        }
      </Box>
    </FormGroup>
  );
};

export default memo(CheckboxBar);