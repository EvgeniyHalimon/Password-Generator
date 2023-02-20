import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { IconButton } from '@mui/material';
import { FC } from 'react';

interface IRegisterButton{
  onClick() : void
}

const RegisterButton: FC<IRegisterButton> = ({ onClick }) => {
  return (
    <IconButton data-testid='auth-button' onClick={onClick} >
      <LoginOutlinedIcon sx={{ color: 'white' }} /> 
    </IconButton>
  );
};

export { RegisterButton };