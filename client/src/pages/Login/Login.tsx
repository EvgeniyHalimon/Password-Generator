import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import './style.scss';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return(
    <Box component='form' onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id='email'
        name='email'
        label='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        className='textfield'
        sx={{
          '& label': {
            '&.Mui-focused': {
              top: '-6px',
            },
          },
        }}
      />
      <TextField
        fullWidth
        id='password'
        name='password'
        label='Password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        className='textfield'
        sx={{
          '& label': {
            '&.Mui-focused': {
              top: '-6px',
            },
          },
        }}
      />
      <Button 
        color='primary' 
        variant='contained' 
        fullWidth 
        type='submit' 
        className='button'
      >
          Submit
      </Button>
    </Box>
  );
};

export { Login };