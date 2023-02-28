
import DeleteIcon from '@mui/icons-material/Delete';
import { Toolbar, Typography, IconButton, Box } from '@mui/material';
/* import debounce from 'lodash.debounce'; */
import { memo, FC } from 'react';

import { DELETE_PASSWORDS } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { ITableToolbar } from '../../types/types';
import AddPasswordForm from '../AddPasswordForm/AddPasswordForm';
import { StyledTextField } from '../StyledComponents/StyledTextField';

const TableToolbar: FC<ITableToolbar> = ({ numSelected, passwords, search, setSelected, fetchFunc, setSearch }) => {
  const { postDataToBackend } = useAxios();

  const deletePasswords = async () => {
    await postDataToBackend(DELETE_PASSWORDS, { ids: passwords });
    await fetchFunc();
    setSelected([]);
  };

  const handleSearchPassword = (e: any) => {
    setSearch(e.target.value);
  };

  /* const debouncedResults = useMemo(() => {
    return debounce(handleSearchPassword, 1000);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }); */

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
            value={search}
            onChange={(e) => handleSearchPassword(e)}
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
    </Toolbar>
  );
};

export default memo(TableToolbar);

function useMemo(arg0: () => any, arg1: never[]) {
  throw new Error('Function not implemented.');
}


function debounce(handleChange: any, arg1: number) {
  throw new Error('Function not implemented.');
}


function useEffect(arg0: () => () => void) {
  throw new Error('Function not implemented.');
}
