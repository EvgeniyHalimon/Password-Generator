import { TextField } from '@mui/material';
import { FC, memo } from 'react';

import { IFormInput } from '../../types/types';
import './style.scss';

const FormInput: FC<IFormInput> = ({ 
  id, name, label, type, value, onChange, error, helperText, hasIcon,
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
      autoComplete='off'
      sx={{
        '& label': {
          '&.Mui-focused': {
            top: '-6px',
          },
        },
        '.MuiInputBase-input': {
          width: hasIcon ? '87%' : '100%',
        },
      }}
    />
  );
};

export default memo(FormInput);