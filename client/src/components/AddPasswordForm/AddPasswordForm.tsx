import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, Box, Button, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState, FC } from 'react';
import * as yup from 'yup';

import { PASSWORD } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { WarningMessages } from '../../types/enums';
import FormInput from '../FormInput/FormInput';
import { StyledDialodAddForm } from '../StyledComponents/StyledDialodAddForm';
import { SubmitButton } from '../SubmitButton/SubmitButton';

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
}

const AddPasswordForm: FC<IAddPasswordForm> = ({ fetchFunc }) => {
  const { post } = useAxios();

  const [postSuccess, setPostSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      applicationName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await post(PASSWORD, values);
      if(data.data){
        setOpen(false);
        setPostSuccess(true);
        //! TODO: how to refresh state without fetchFunc
        fetchFunc();
      }
    },
  });
  
  const handleOpen = () => {
    setOpen(!open);
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
            type='password' 
            value={formik.values.password} 
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)} 
            helperText={formik.touched.password && formik.errors.password}  
          />
          <Box display='flex' >
            <SubmitButton />
            <Button variant='contained' className='button' onClick={handleOpen}>
              Close
            </Button>
          </Box>
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