import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, Typography, IconButton, Box, Alert, Snackbar } from '@mui/material';
import { memo, FC, ChangeEvent, useState } from 'react';

import { DELETE_PASSWORDS } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { WarningMessages } from '../../types/enums';
import { ITableToolbar } from '../../types/types';
import AddPasswordForm from '../AddPasswordForm/AddPasswordForm';
import { StyledTextField } from '../StyledComponents/StyledTextField';

const TableToolbar: FC<ITableToolbar> = ({ numSelected, passwords, search, setSelected, fetchFunc, setSearch }) => {
  const { postDataToBackend } = useAxios();

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const deletePasswords = async () => {
    const deleteResponce: any = await postDataToBackend(DELETE_PASSWORDS, { ids: passwords });
    setDeleteSuccess(true);
    setSelected([]);
    if(deleteResponce.status === 204){
      fetchFunc();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearch(e.target.value);
    },1000);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box sx={{ width: '100%', p: '1.5rem 0' }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h1'
          id='tableTitle'
          component='div'
        >
          Passwords
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='space-between' padding={'15px 0 5px 0'}>
          <StyledTextField 
            type='text'
            placeholder='Password' 
            autoComplete='off'
            onChange={handleChange}
          />
          <Box display='flex' alignItems='center'>
            {numSelected > 0 ?
              <Typography
                sx={{ flex: '1 1 100%' }}
                color='inherit'
                variant='subtitle1'
                component='div'
              >
                {numSelected} selected
                <IconButton onClick={() => deletePasswords()}>
                  <DeleteIcon sx={{  color: 'black' }}/>
                </IconButton>
              </Typography> : 
              null
            }
            <AddPasswordForm fetchFunc={fetchFunc}/>
          </Box>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={() => setDeleteSuccess(false)}
        open={deleteSuccess}
      >
        <Alert severity='success' onClose={() => setDeleteSuccess(false)}>{numSelected !== 1 ? WarningMessages.DELETE_MANY : WarningMessages.DELETE_ONE}</Alert>
      </Snackbar>
    </Toolbar>
  );
};

export default memo(TableToolbar);
