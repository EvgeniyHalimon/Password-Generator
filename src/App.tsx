import { useState } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Layout } from './components/Layout';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';

import './App.scss';

function App() {

  const [mode, setMode] = useState(true)

  return (
    <Layout>
      <IconButton onClick={() => setMode(!mode)}>
        {mode ? <LightModeIcon/> : <DarkModeIcon/>}
      </IconButton>
      <PasswordGenerator/>
    </Layout>
  );
}

export default App;
