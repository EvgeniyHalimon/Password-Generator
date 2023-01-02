import { Checkbox, FormControlLabel } from '@mui/material';
import { memo, FC } from 'react';

interface IPasswordOption{
  flag: boolean,
  setFlag: (value: boolean) => void,
  label: string
}

const PasswordOption: FC<IPasswordOption> = ({ flag, setFlag, label }) => {
  return (
    <FormControlLabel 
      control={<Checkbox checked={flag}/>} 
      onClick={() => setFlag(!flag)}
      label={label}
    />
  );
};

export default memo(PasswordOption);