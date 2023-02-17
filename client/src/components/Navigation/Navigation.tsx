import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import { removeTokens } from '../../utils/tokensWorkshop';
import './Navigation.scss';

interface INavigation{
    mode: string | null,
    setTheme: any
}

const Navigation: FC<INavigation> = ({ mode, setTheme }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const register = () => {
    navigate('/register');
  };

  const logout = () => {
    setUser(null);
    removeTokens();
    navigate('/login');
  };

  return (
    <AppBar position='sticky' color='primary'>
      <Toolbar className='toolbar'>
        <Box display='flex' alignItems='center' gap={3}>
          <Box display='flex' alignItems='center' gap={1}>
            <IconButton color='inherit'>
              &#128031;
            </IconButton>
            <Typography variant='h1'>Carasique</Typography>
          </Box>
          {user &&
            (<>
              <Typography variant='h6'><Link to='/dashboard'>Dashboard</Link></Typography>
              <Typography variant='h6'><Link to='/password-generator'>Password Generator</Link></Typography>
              <Typography variant='h6'><Link to='/password-list'>Password List</Link></Typography>
            </>)
          }
        </Box>
        <Box>
          <IconButton data-testid='auth-button'>
            {
              localStorage.getItem('accessToken') === null ? 
                <LoginOutlinedIcon sx={{ color: 'white' }} onClick={register}/> : 
                <LogoutOutlinedIcon sx={{ color: 'white' }} onClick={logout}/>
            }
          </IconButton>
          <IconButton data-testid='switch-theme-button' onClick={() => setTheme()}>
            {mode === 'light' ? <LightModeIcon sx={{ color: 'white' }} /> : <DarkModeIcon sx={{  color: 'white' }} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navigation };