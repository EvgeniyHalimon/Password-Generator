import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
import { memo, FC } from 'react';

import { DELETE_PASSWORDS } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { ITableToolbar } from '../../types/types';
import { StyledTextField } from '../StyledComponents/StyledTextField';

const TableToolbar: FC<ITableToolbar> = ({ numSelected, passwords, setSelected }) => {
  const { postDataToBackend } = useAxios();

  const deletePasswords = async () => {
    await postDataToBackend(DELETE_PASSWORDS, { ids: passwords });
    setSelected([]);
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
            placeholder='Password' 
            variant='outlined' 
            autoComplete='off' 
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
            <IconButton>
              <AddBoxIcon sx={{  color: 'black' }}/>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Toolbar>
  );
};

export default memo(TableToolbar);