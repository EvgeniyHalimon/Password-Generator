import { useState, useMemo } from 'react';
import { createTheme, CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Layout } from './components/Layout';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';
import { lightTheme } from './components/Theme/lightTheme';
import { darkTheme } from './components/Theme/darkTheme';
import './App.scss';

function App() {

  const [mode, setMode] = useState('light')

  const theme = useMemo(() => createTheme(mode === "light" ? lightTheme : darkTheme),[mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout>
        <IconButton id='icon-button' onClick={() => setMode(mode === "light" ? 'dark' : 'light')}>
          {mode === "light" ? <LightModeIcon sx={{color: 'black'}}/> : <DarkModeIcon sx={{color: 'white'}}/>}
        </IconButton>
        <PasswordGenerator/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
