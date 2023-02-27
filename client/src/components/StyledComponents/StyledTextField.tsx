import { styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme, value }) => ({
  background: 'transparent',
  '.MuiInputBase-root': {
    height: '2rem',
  },
}));

