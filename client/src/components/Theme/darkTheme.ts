import { ThemeOptions } from '@mui/material';

import { typography } from './typography';

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#200208',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#523132',
      default: '#734d4d',
    },
    divider: 'rgba(0,0,0,0.68)',
    success: {
      main: '#57873d',
    },
    info: {
      main: '#2c2dea',
    },
  },
  typography: typography,
  components:{
    MuiTextField:{
      styleOverrides:{
        root: {
          backgroundColor: '#3a1b1b',
        },
      },
    },
    MuiFormHelperText:{
      styleOverrides:{
        root: {
          margin: 0,
          backgroundColor: 'transparent',
        },
      },
    },
  },
};