import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useState, FC } from 'react';
import * as yup from 'yup';

import { PASSWORD } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
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
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

interface IAddPasswordForm{
  fetchFunc: any
}

const AddPasswordForm: FC<IAddPasswordForm> = ({ fetchFunc }) => {
  const { postDataToBackend } = useAxios();
  const formik = useFormik({
    initialValues: {
      applicationName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postDataToBackend(PASSWORD, values);
      if(data.data){
        setOpen(false);
        fetchFunc();
      }
    },
  });
  const [open, setOpen] = useState(false);

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
    </>
  );
};

export default memo(AddPasswordForm);