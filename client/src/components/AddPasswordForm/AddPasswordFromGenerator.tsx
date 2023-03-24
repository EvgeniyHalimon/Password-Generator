import AddIcon from '@mui/icons-material/Add';
import { IconButton, Box, Button, Alert, Snackbar } from '@mui/material';
import { Form, Formik /* useFormik,  *//* useFormikContext */ } from 'formik';
import { memo, useState, FC/*  useEffect */ } from 'react';
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
    password: string
}

const AddPasswordFromGenerator: FC<IAddPasswordForm> = ({ password }) => {
  const { post } = useAxios();

  const [postSuccess, setPostSuccess] = useState(false);
  const [limitAlert, setLimitAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const values = {
    applicationName: '',
    password: password,
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    values.applicationName = '';
    values.password = '';
  };

  return(
    <>
      <IconButton onClick={handleOpen}>
        <AddIcon role='copy-icon'/>
      </IconButton>
      <StyledDialodAddForm open={open}>
        <Formik 
          initialValues={values} 
          validationSchema={validationSchema}
          onSubmit={ async (values) => {
            try {
              const data = await post(PASSWORD, values);
              if(data.data){
                setOpen(false);
                setPostSuccess(true);
              }
            } catch (error) {
              console.log(error);
              setOpen(false);
              setLimitAlert(true);
            }
          }}
        >
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <FormInput
                id='applicationName' 
                name='applicationName' 
                label='Application Name' 
                type='text' 
                value={props.values.applicationName} 
                onChange={props.handleChange}
                error={props.touched.applicationName && Boolean(props.errors.applicationName)} 
                helperText={props.touched.applicationName && props.errors.applicationName}  
              />
              <FormInput
                id='password' 
                name='password' 
                label='Password' 
                type='password' 
                value={props.values.password} 
                onChange={props.handleChange}
                error={props.touched.password && Boolean(props.errors.password)} 
                helperText={props.touched.password && props.errors.password}  
              />
              <Box display='flex' >
                <SubmitButton />
                <Button variant='contained' className='button' onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </StyledDialodAddForm>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setPostSuccess(false)}
        open={postSuccess}
      >
        <Alert severity='success' onClose={() => setPostSuccess(false)}>{WarningMessages.ADDED}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setLimitAlert(false)}
        open={limitAlert}
      >
        <Alert severity='error' onClose={() => setLimitAlert(false)}>{WarningMessages.LIMIT}</Alert>
      </Snackbar>
    </>
  );
};

export default memo(AddPasswordFromGenerator);