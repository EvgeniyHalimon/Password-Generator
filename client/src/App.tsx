import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  createTheme, CssBaseline, IconButton, ThemeProvider,
} from '@mui/material';
import { useState, useMemo } from 'react';

import { Layout } from './components/Layout';
import { darkTheme } from './components/Theme/darkTheme';
import { lightTheme } from './components/Theme/lightTheme';
import PasswordGenerator from './pages/PasswordGenerator/PasswordGenerator';
import './App.scss';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <IconButton data-testid='switch-theme-button' id='icon-button' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? <LightModeIcon sx={{ color: 'black' }} /> : <DarkModeIcon sx={{ color: 'white' }} />}
        </IconButton>
        <PasswordGenerator />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
