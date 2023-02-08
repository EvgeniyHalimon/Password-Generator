import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { memo } from 'react';
import * as yup from 'yup';

import FormInput from '../../components/FormInput/FormInput';
import { SubmitButton } from '../../components/SubmitButton/SubmitButton';
import { IFormInput } from '../../components/types';
import { uid } from '../../utils/uniqueId';

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
  innerPassword: yup
    .string()
    .trim()
    .min(4, 'Inner Password should be of minimum 4 characters length')
    .required('Inner Password is required'),
});

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      innerPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const inputData: IFormInput[] = [
    {
      id: 'username', 
      name: 'username' ,
      label: 'Username', 
      type: 'text' ,
      value: formik.values.username, 
      onChange: formik.handleChange,
      error: formik.touched.username && Boolean(formik.errors.username),
      helperText: formik.touched.username && formik.errors.username,
    },
    {
      id: 'email', 
      name: 'email' ,
      label: 'Email', 
      type: 'email' ,
      value: formik.values.email, 
      onChange: formik.handleChange,
      error: formik.touched.email && Boolean(formik.errors.email),
      helperText: formik.touched.email && formik.errors.email,
    },
    {
      id: 'password', 
      name: 'password' ,
      label: 'Password', 
      type: 'password' ,
      value: formik.values.password, 
      onChange: formik.handleChange,
      error: formik.touched.password && Boolean(formik.errors.password),
      helperText: formik.touched.password && formik.errors.password,
    },
    {
      id: 'innerPassword', 
      name: 'innerPassword' ,
      label: 'Inner Password', 
      type: 'password' ,
      value: formik.values.innerPassword, 
      onChange: formik.handleChange,
      error: formik.touched.innerPassword && Boolean(formik.errors.innerPassword),
      helperText: formik.touched.innerPassword && formik.errors.innerPassword,
    },
  ];

  return(
    <Box component='form' onSubmit={formik.handleSubmit}>
      {inputData.map((formInput) => 
        <FormInput
          key={uid()} 
          id={formInput.id} 
          name={formInput.name} 
          label={formInput.label} 
          type={formInput.type} 
          value={formInput.value} 
          onChange={formInput.onChange}
          error={formInput.error} 
          helperText={formInput.helperText}        
        />,
      )}
      <SubmitButton />
    </Box>
  );
};

const Register = memo(RegisterForm);

export { Register };