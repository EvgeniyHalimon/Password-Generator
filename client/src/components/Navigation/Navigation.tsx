import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { removeTokens } from '../../utils/tokensWorkshop';

interface INavigation{
    mode: string | null,
    getThemeColor: any,
    setTheme: any
}

const Navigation: FC<INavigation> = ({ mode, getThemeColor, setTheme }) => {
  const navigate = useNavigate();

  const register = () => {
    navigate('/register');
  };

  const logout = () => {
    removeTokens();
    navigate('/login');
  };

  return (
    <AppBar position='sticky' color='secondary'>
      <Toolbar>
        <Box display='flex' alignItems='center'>
          <IconButton>
            &#128031;
          </IconButton>
          <Typography variant='h1'>Carasique</Typography>
        </Box>
        <Box id='icon-buttons'>
          <IconButton data-testid='auth-button'>
            {
              localStorage.getItem('accessToken') === null ? 
                <LoginOutlinedIcon sx={{ color: getThemeColor() }} onClick={register}/> : 
                <LogoutOutlinedIcon sx={{ color: getThemeColor() }} onClick={logout}/>
            }
          </IconButton>
          <IconButton data-testid='switch-theme-button' onClick={() => setTheme()}>
            {mode === 'light' ? <LightModeIcon sx={{ color: getThemeColor() }} /> : <DarkModeIcon sx={{ color: getThemeColor() }} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navigation };