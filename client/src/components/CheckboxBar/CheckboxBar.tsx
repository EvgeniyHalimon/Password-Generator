import { Box, FormGroup, FormLabel } from '@mui/material';
import { FC, memo } from 'react';

import { staticCheckboxPropsList } from '../../types/enums';
import { IPasswordOptions } from '../../types/types';
import PasswordOption from '../PasswordOption/PasswordOption';

interface ICheckboxBar{
  passwordOptions: IPasswordOptions,
  updatePasswordOption(field: keyof IPasswordOptions, isChecked: boolean): void,
}

const CheckboxBar: FC<ICheckboxBar> = ({ passwordOptions, updatePasswordOption }) => {
  return (
    <FormGroup role='form-group'>
      <FormLabel component='legend'>Choose options</FormLabel>
      <Box>
        {
          staticCheckboxPropsList.map(({ label, updatedField }) => (
            <PasswordOption
              key={crypto.randomUUID()}
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