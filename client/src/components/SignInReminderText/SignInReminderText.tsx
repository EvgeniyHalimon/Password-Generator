import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import './style.scss';

const SignInReminderText = () => {
  return(
    <Typography component='h3'>
      Already have an account? <Link id='reminder' to='/login'>Sign in.</Link>
    </Typography>
  );
};

export { SignInReminderText };