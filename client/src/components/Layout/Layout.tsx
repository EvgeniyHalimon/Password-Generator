import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, createTheme, CssBaseline, ThemeProvider, IconButton } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { darkTheme } from '../Theme/darkTheme';
import { lightTheme } from '../Theme/lightTheme';
import './style.scss';

const Layout: FC = () => {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='App' role='layout'>
        <IconButton data-testid='switch-theme-button' id='icon-button' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? <LightModeIcon sx={{ color: 'black' }} /> : <DarkModeIcon sx={{ color: 'white' }} />}
        </IconButton>
        <Outlet/>
      </Box>
    </ThemeProvider>
  );
};

export { Layout };