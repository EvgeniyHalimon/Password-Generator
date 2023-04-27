import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { FC, memo } from 'react';

interface IVisibilityButton{
    showPassword: boolean,
    setShowPassword: (value: boolean) => void,
    id: string
}

const VisibilityButton: FC<IVisibilityButton> = ({ showPassword, setShowPassword, id }) => {
  return (
    <IconButton onClick={() => setShowPassword(!showPassword)} id={id}>
      {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
    </IconButton>
  );
};

export default memo(VisibilityButton);