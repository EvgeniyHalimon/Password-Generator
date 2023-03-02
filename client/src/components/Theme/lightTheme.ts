import { ThemeOptions } from '@mui/material';

import { typography } from './typography';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#8b4754',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#f1aab7',
      default: '#eccdcc',
    },
    divider: 'rgba(0,0,0,0.68)',
    success: {
      main: '#57873d',
    },
    info: {
      main: '#2c2dea',
    },
    text: {
      primary: '#0e0e25',
    },
  },
  typography: typography,
  components:{
    MuiTextField:{
      styleOverrides:{
        root: {
          backgroundColor: '#f19292',
        },
      },
    },
    MuiFormHelperText:{
      styleOverrides:{
        root: {
          margin: 0,
          backgroundColor: '#f1aab7',
        },
      },
    },
  },
};