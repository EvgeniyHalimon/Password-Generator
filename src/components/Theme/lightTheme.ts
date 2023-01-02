import { ThemeOptions } from '@mui/material';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4e000f',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#ffc0cb',
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
  typography: {
    h1: {
      fontSize: '6rem',
      lineHeight: 1.2,
      fontFamily: 'Syne Mono',
    },
    fontFamily: 'Inconsolata',
    fontSize: 14,
  },
  components:{
    MuiTextField:{
      styleOverrides:{
        root: {
          backgroundColor: '#f19292',
        },
      },
    },
  },
};