import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import ErrorMessage from '../components/ErrorMessage';
import FormInput from '../components/FormInput/FormInput';
import { SubmitButton } from '../components/SubmitButton/SubmitButton';
import VisibilityButton from '../components/VisibilityButton';
import { LOGIN } from '../constants/backendConstants';
import { AuthContext } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';

import { getAccessToken, saveTokens } from '../utils/tokensWorkshop';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email'),
  password: yup
    .string()
    .trim(),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { post } = useAxios();
  const { setUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await post(LOGIN, values);
      if(data.data){
        saveTokens(data.data);
        setUser(getAccessToken());
        navigate('/dashboard');
      }
      setErrorMessage(data.message);
    },
  });

  return(
    <Box component='form' sx={{ margin: 'auto' }} onSubmit={formik.handleSubmit} className='form'>
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
      <ErrorMessage message={errorMessage}/>
      <VisibilityButton showPassword={showPassword} setShowPassword={setShowPassword} id={'loginVisibilityIcon'}/>
    </Box>
  );
};

const Login = memo(LoginForm);

export { Login };