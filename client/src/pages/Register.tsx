import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput/FormInput';
import { SignInReminderText } from '../components/SignInReminderText/SignInReminderText';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';
import { REGISTER } from '../constants/backendConstants';
import useAxios from '../hooks/useAxios';
import { saveTokens } from '../utils/tokensWorkshop';

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(2, 'Username should be of mimnimum 2 characters')
    .required('Username is required'),
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
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  innerPassword: yup
    .string()
    .trim()
    .min(4, 'Inner Password should be of minimum 4 characters length')
    .required('Inner Password is required'),
  confirmInnerPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('innerPassword'), null], 'Inner passwords must match'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { post } = useAxios();

  const [errorMessage, setErrorMessage] = useState('');
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      innerPassword: '',
      confirmInnerPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await post(REGISTER, {
        username: values.username,
        email: values.email,
        password: values.password,
        innerPassword: values.innerPassword,
      });
      if(data.data){
        navigate('/login');
        saveTokens(data.data);
      }
      setErrorMessage(data.message);
    },
  });

  return(
    <Box component='form' sx={{ margin: 'auto' }}  onSubmit={formik.handleSubmit} className='form'>
      <FormInput
        id='username' 
        name='username' 
        label='Username' 
        type='text' 
        value={formik.values.username} 
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)} 
        helperText={formik.touched.username && formik.errors.username}  
      />
      <FormInput
        id='email' 
        name='email' 
        label='Email' 
        type='email' 
        value={formik.values.email} 
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)} 
        helperText={formik.touched.email && formik.errors.email}  
      />
      <FormInput
        id='password' 
        name='password' 
        label='Password' 
        type='password' 
        value={formik.values.password} 
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)} 
        helperText={formik.touched.password && formik.errors.password}  
      />
      <FormInput
        id='confirmPassword' 
        name='confirmPassword' 
        label='Confirm Password' 
        type='password' 
        value={formik.values.confirmPassword} 
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} 
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}  
      />
      <FormInput
        id='innerPassword' 
        name='innerPassword' 
        label='Inner Password' 
        type='password' 
        value={formik.values.innerPassword} 
        onChange={formik.handleChange}
        error={formik.touched.innerPassword && Boolean(formik.errors.innerPassword)} 
        helperText={formik.touched.innerPassword && formik.errors.innerPassword}  
      />
      <FormInput
        id='confirmInnerPassword' 
        name='confirmInnerPassword' 
        label='Confirm Inner Password' 
        type='password' 
        value={formik.values.confirmInnerPassword} 
        onChange={formik.handleChange}
        error={formik.touched.confirmInnerPassword && Boolean(formik.errors.confirmInnerPassword)} 
        helperText={formik.touched.confirmInnerPassword && formik.errors.confirmInnerPassword}  
      />
      <SubmitButton />
      <SignInReminderText/>
      <ErrorMessage message={errorMessage}/>
    </Box>
  );
};

const Register = memo(RegisterForm);

export { Register };