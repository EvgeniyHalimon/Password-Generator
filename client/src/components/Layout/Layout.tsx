import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, createTheme, CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { removeTokens } from '../../utils/tokensWorkshop';
import { darkTheme } from '../Theme/darkTheme';
import { lightTheme } from '../Theme/lightTheme';
import './style.scss';

const Layout: FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  const setTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', mode === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMode(String(localStorage.getItem('theme')));
  },[mode]);

  const login = () => {
    navigate('/login');
  };

  const logout = () => {
    navigate('/login');
    removeTokens();
  };

  const setColor = () => {
    return mode === 'light' ? 'black' : 'white';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='App' role='layout'>
        <Box id='icon-buttons'>
          <IconButton data-testid='auth-button'>
            {
              localStorage.getItem('accessToken') === null ? 
                <LoginOutlinedIcon sx={{ color: setColor() }} onClick={login}/> : 
                <LogoutOutlinedIcon sx={{ color: setColor() }} onClick={logout}/>
            }
          </IconButton>
          <IconButton data-testid='switch-theme-button' onClick={() => setTheme()}>
            {mode === 'light' ? <LightModeIcon sx={{ color: setColor() }} /> : <DarkModeIcon sx={{ color: setColor() }} />}
          </IconButton>
        </Box>
        <Outlet/>
      </Box>
    </ThemeProvider>
  );
};

export { Layout };