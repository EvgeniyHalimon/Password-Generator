import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import { getAccessToken, removeTokens } from '../../utils/tokensWorkshop';

import { LogoutButton } from './LogoutButton';

import './Navigation.scss';
import { NavigationLink } from './NavigationLink';
import { RegisterButton } from './RegisterButton';

interface INavigation{
    mode: string | null,
    setTheme() : void
}

const routes = [{ route:'/dashboard', title: 'Dashboard' },{ route:'/password-generator', title: 'Password Generator' },{ route:'/password-list', title: 'Password List' }];

const Navigation: FC<INavigation> = ({ mode, setTheme }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
              {routes.map((route) =>
                <NavigationLink key={route.route} location={location.pathname} route={route.route} title={route.title}/>,
              )}
            </>)
          }
        </Box>
        <Box>
          {
            getAccessToken() == null ? 
              <RegisterButton onClick={register}/> : 
              <LogoutButton onClick={logout}/>
          }
          <IconButton data-testid='switch-theme-button' onClick={() => setTheme()}>
            {mode === 'light' ? <LightModeIcon sx={{ color: 'white' }} /> : <DarkModeIcon sx={{  color: 'white' }} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Navigation };