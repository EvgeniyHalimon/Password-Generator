import { ThemeOptions } from '@mui/material';

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
          backgroundColor: '#3a1b1b',
        },
      },
    },
  },
};