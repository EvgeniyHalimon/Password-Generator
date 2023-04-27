import { Checkbox, FormControlLabel } from '@mui/material';
import { memo, FC } from 'react';

import { IPasswordOptions } from '../../types/types';


interface IPasswordOption{
  isChecked: boolean,
  updatePasswordOption: (field: keyof IPasswordOptions, isChecked: boolean) => void,
  label: string,
  updatedField: keyof IPasswordOptions
}

const PasswordOption: FC<IPasswordOption> = ({ isChecked, updatePasswordOption, label, updatedField }) => {
  return (
    <FormControlLabel 
      control={<Checkbox data-testid='form-checkbox' checked={isChecked}/>} 
      onClick={() => updatePasswordOption(updatedField, isChecked)}
      label={label}
      role='form-control-label'
    />
  );
};

export default memo(PasswordOption);