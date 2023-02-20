import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';
import { darkTheme } from '../Theme/darkTheme';
import { lightTheme } from '../Theme/lightTheme';
import './style.scss';

const Layout: FC = () => {
  const [mode, setMode] = useState<string | null>(() => localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  const setTheme = useCallback((): void => { 
    setMode(mode === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', mode === 'dark' ? 'light' : 'dark');
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation mode={mode} setTheme={setTheme}/>
      <Box className='App' role='layout'>
        <Outlet/>
      </Box>
    </ThemeProvider>
  );
};

export { Layout };