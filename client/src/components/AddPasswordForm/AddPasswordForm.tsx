import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, Box, Button, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState, FC } from 'react';
import * as yup from 'yup';

import { PASSWORD } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { WarningMessages } from '../../types/enums';
import ErrorMessage from '../ErrorMessage';
import FormInput from '../FormInput/FormInput';
import { StyledDialodAddForm } from '../StyledComponents/StyledDialodAddForm';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import VisibilityButton from '../VisibilityButton';
import './style.scss';

const validationSchema = yup.object({
  applicationName: yup
    .string()
    .trim()
    .min(2, 'Application Name should be of minimum 2 characters length')
    .required('Application Name is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required'),
});

interface IAddPasswordForm{
  fetchFunc: any
  setAccounts: any
  accounts: any
}

const AddPasswordForm: FC<IAddPasswordForm> = ({ fetchFunc, setAccounts, accounts }) => {
  const { post } = useAxios();

  const [postSuccess, setPostSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      applicationName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await post(PASSWORD, values);
      setErrorMessage(data.message);
      if(data.data){
        setOpen(false);
        setPostSuccess(true);
        fetchFunc();
      }
    },
  });
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.values.applicationName = '';
    formik.values.password = '';
  };

  return(
    <>
      <IconButton onClick={handleOpen}>
        <AddBoxIcon sx={{  color: 'black' }}/>
      </IconButton>
      <StyledDialodAddForm open={open}>
        <Box component='form' onSubmit={formik.handleSubmit}>
          <FormInput
            id='applicationName' 
            name='applicationName' 
            label='Application Name' 
            type='text' 
            value={formik.values.applicationName} 
            onChange={formik.handleChange}
            error={formik.touched.applicationName && Boolean(formik.errors.applicationName)} 
            helperText={formik.touched.applicationName && formik.errors.applicationName}  
          />
          <FormInput
            id='password' 
            name='password' 
            label='Password' 
            type={showPassword ? 'text' : 'password'} 
            value={formik.values.password} 
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)} 
            helperText={formik.touched.password && formik.errors.password}  
            hasIcon={true}
          />
          <VisibilityButton showPassword={showPassword} setShowPassword={setShowPassword} id={'visibilityButton'}/>
          <Box display='flex' >
            <SubmitButton />
            <Button variant='contained' className='button' onClick={handleClose}>
              Close
            </Button>
          </Box>
          <ErrorMessage message={errorMessage}/>
        </Box>
      </StyledDialodAddForm>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setPostSuccess(false)}
        open={postSuccess}
      >
        <Alert severity='success' onClose={() => setPostSuccess(false)}>{WarningMessages.ADDED}</Alert>
      </Snackbar>
    </>
  );
};

export default memo(AddPasswordForm);