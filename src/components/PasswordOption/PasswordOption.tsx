import { Checkbox, FormControlLabel } from '@mui/material';
import { memo, FC } from 'react';

import { LabelsToPasswordOptions } from '../enums';

interface IPasswordOption{
  flag: boolean,
  setFlag: (field: string, flag: boolean) => void,
  label: string
}

const PasswordOption: FC<IPasswordOption> = ({ flag, setFlag, label }) => {
  return (
    <FormControlLabel 
      control={<Checkbox data-testid='form-checkbox' checked={flag}/>} 
      onClick={() => setFlag(LabelsToPasswordOptions[label], !flag)}
      label={label}
      role='form-control-label'
    />
  );
};

export default memo(PasswordOption);