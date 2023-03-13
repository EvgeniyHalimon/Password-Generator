
import { Box, Checkbox, Paper, Table, TableBody, TableCell,
  TableContainer, TableRow } from '@mui/material';
import { useState, memo, useEffect } from 'react';

import TableToolbar from '../components/PasswordList/TableToolbar';
import Tablehead from '../components/PasswordList/Tablehead';
import { StyledPagination } from '../components/StyledComponents/StyledPagination';
import { DECRYPT_PASSWORDS, GET_PASSWORDS } from '../constants/backendConstants';
import useAxios from '../hooks/useAxios';

import { IPasswordObject, ITablehead, OrderOption } from '../types/types';

const AccountList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<OrderOption>('asc');
  const [sortBy, setSortBy] = useState<keyof ITablehead>('applicationName');
  const [selected, setSelected] = useState<string[]>([]);
  const [passwords, setPasswords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const LIMIT_PER_PAGE = 8;

  const queries = {
    search: search,
    page: page,
    limit: LIMIT_PER_PAGE,
    sortBy: sortBy,
    sort: sort,
  };

  const { get, post } = useAxios();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITablehead,
  ) => {
    const isAsc = sortBy === property && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const selectAllAccounts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = passwords.map((n: any) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const selectAccount = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const changePage = (event: unknown, newPage: number) => {
    setPage(Number(newPage));
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  let isPasswordsFetching = false;
  const getPasswords = async() => {
    if(!isPasswordsFetching){
      try {
        const passwordsData: any = await get(GET_PASSWORDS(queries));
        setTotalPages(passwordsData.data.totalPages);
        setPasswords(passwordsData.data.accounts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //! TODO: how to keep encrypted passwords after request?
  const getDecryptedPasswords = async (password: string) => {
    const decryptedPasswords = await post(DECRYPT_PASSWORDS(queries), { innerPassword: password });
    setTotalPages(decryptedPasswords.data.totalPages);
    setPasswords(decryptedPasswords.data.accounts);
  };

  useEffect(() => {
    getPasswords();
    return () => {
      isPasswordsFetching = true;
    };
  },[page, search, sort, sortBy]);

  return (
    <Box sx={{ width: '75%', margin: '0 auto' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar 
          numSelected={selected.length} 
          passwords={selected} 
          search={search}
          fetchFunc={getPasswords}
          setSelected={setSelected}
          setSearch={setSearch}
        />
        <button onClick={() => getDecryptedPasswords('1234')}>test button to get encrypted password</button>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
          >
            <Tablehead
              numSelected={selected.length}
              order={sort}
              orderBy={sortBy}
              onSelectAllClick={selectAllAccounts}
              onRequestSort={handleRequestSort}
              rowCount={passwords.length}
            />
            <TableBody>
              {passwords.map((row: IPasswordObject) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${row._id}`;

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox' sx={{ pl: 1 }} onClick={(event) => selectAccount(event, row._id)} >
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      align='center'
                    >
                      {row.applicationName}
                    </TableCell>
                    <TableCell align='center'>{typeof row.password === 'object' ? '********' : row.password}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledPagination
          count={totalPages}
          page={page}
          shape='rounded'
          onChange={(e, value) => changePage(e, value)}
        />
      </Paper>
    </Box>
  );
};

export default memo(AccountList);