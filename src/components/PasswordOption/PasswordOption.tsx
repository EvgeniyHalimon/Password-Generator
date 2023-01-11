import { Checkbox, FormControlLabel } from '@mui/material';
import { memo, FC } from 'react';


interface IPasswordOption{
  isChecked: boolean,
  updatePasswordOption: (field: string, flag: boolean) => void,
  label: string,
  updatedField: string
}

const PasswordOption: FC<IPasswordOption> = ({ isChecked, updatePasswordOption, label, updatedField }) => {
  return (
    <FormControlLabel 
      control={<Checkbox data-testid='form-checkbox' checked={isChecked}/>} 
      onClick={() => updatePasswordOption(updatedField, !isChecked)}
      label={label}
      role='form-control-label'
    />
  );
};

export default memo(PasswordOption);