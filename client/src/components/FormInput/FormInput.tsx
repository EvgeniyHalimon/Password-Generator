import { TextField } from '@mui/material';
import { FC, memo } from 'react';

import { IFormInput } from '../types';
import './style.scss';

const FormInput: FC<IFormInput> = ({ 
  id, name, label, type, value, onChange, error, helperText, 
}) => {
  return(
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className='textfield'
      sx={{
        '& label': {
          '&.Mui-focused': {
            top: '-6px',
          },
        },
      }}
    />
  );
};

export default memo(FormInput);