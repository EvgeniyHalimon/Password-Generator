
import { Box, Checkbox, Paper, Table, TableBody, TableCell,
  TableContainer, TableRow } from '@mui/material';
import { useState, memo, useEffect, useCallback } from 'react';

import MutableTableCell from '../components/AccountsTableComponents/MutableTableCell';
import TableToolbar from '../components/AccountsTableComponents/TableToolbar';
import Tablehead from '../components/AccountsTableComponents/Tablehead';
import { StyledPagination } from '../components/StyledComponents/StyledPagination';
import { DECRYPT_PASSWORDS, GET_PASSWORDS } from '../constants/backendConstants';
import useAxios from '../hooks/useAxios';

import { IPasswordObject, ITablehead, OrderOption } from '../types/types';

const AccountsTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<OrderOption>('asc');
  const [sortBy, setSortBy] = useState<keyof ITablehead>('applicationName');
  const [selected, setSelected] = useState<string[]>([]);
  const [accounts, setAccounts] = useState<any>([]);
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
      const newSelected = accounts.map((n: any) => n._id);
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
        setAccounts(passwordsData.data.accounts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDecryptedPasswords = useCallback( async (e: any, id: string) => {
    if(e.target.value.trim() !== ''){
      const decryptedPassword = await post(DECRYPT_PASSWORDS, { id: id, innerPassword: e.target.value });
      if(decryptedPassword.message){
        setAccounts(accounts.map((account: IPasswordObject) => {
          if(account._id === id) return { ...account, password: decryptedPassword.message };
          return account;
        }));
      } else if (!decryptedPassword.message) {
        const indexOfEncryptedPassword = accounts.findIndex((account: { _id: string; }) => account._id === id);
        accounts.findIndex((account: { _id: string; }) => account._id === id);
        accounts.splice(indexOfEncryptedPassword, 1, decryptedPassword.data);
        setAccounts([...accounts]);
      }
    }
  }, [accounts]);

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
          fetchFunc={getPasswords}
          setSelected={setSelected}
          setSearch={setSearch}
          accounts={accounts}
          setAccounts={setAccounts}
        />
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
              rowCount={accounts.length} />
            <TableBody>
              {accounts.map((row: IPasswordObject) => {
                const isItemSelected = isSelected(row?._id);
                const labelId = `enhanced-table-checkbox-${row?._id}`;

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox' sx={{ pl: 1 }} onClick={(event) => selectAccount(event, row?._id)}>
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
                      {row?.applicationName}
                    </TableCell>
                    <MutableTableCell 
                      id={row._id} 
                      getDecryptedPasswords={getDecryptedPasswords}
                      passwordField={typeof row?.password === 'object' ? '********' : row?.password}
                    /> 
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

export default memo(AccountsTable);