import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import FormInput from '../../components/FormInput/FormInput';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { LOGIN } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { saveTokens } from '../../utils/tokensWorkshop';

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

const LoginForm = () => {
  const navigate = useNavigate();
  const { postDataToBackend } = useAxios();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postDataToBackend(LOGIN, values);
      console.log('🚀 ~ file: Login.tsx:38 ~ onSubmit: ~ data', data);
      if(data.data){
        navigate('/dashboard');
        saveTokens(data.data);
      }
    },
  });

  return(
    <Box component='form' onSubmit={formik.handleSubmit}>
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
      <SubmitButton />
    </Box>
  );
};

const Login = memo(LoginForm);

export { Login };