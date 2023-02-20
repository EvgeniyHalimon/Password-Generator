import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { IconButton } from '@mui/material';
import { FC } from 'react';

interface ILogoutButton{
  onClick() : void
}

const LogoutButton: FC<ILogoutButton> = ({ onClick }) => {
  return (
    <IconButton data-testid='auth-button' onClick={onClick}>
      <LogoutOutlinedIcon sx={{ color: 'white' }} /> 
    </IconButton>
  );
};

export { LogoutButton };