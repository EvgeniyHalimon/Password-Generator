import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignInReminderText = () => {
  return(
    <Typography component='h3'>
        Already have an account? <Link to='/login'>Sign in.</Link>
    </Typography>
  );
};

export { SignInReminderText };