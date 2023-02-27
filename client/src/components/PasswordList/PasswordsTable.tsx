
import { Box, Checkbox, Paper, Table, TableBody, TableCell,
  TableContainer, TableRow } from '@mui/material';
import { useState, memo, useEffect } from 'react';

import { GET_PASSWORDS } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { OrderOption, ITablehead, IPasswordObject } from '../../types/types';

import { StyledPagination } from '../StyledComponents/StyledPagination';

import TableToolbar from './TableToolbar';
import Tablehead from './Tablehead';


const rows: any[] = [
];

const PasswordsTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<OrderOption>('asc');
  const [sortBy, setSortBy] = useState<keyof ITablehead>('applicationName');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [passwords, setPasswords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const LIMIT_PER_PAGE = 10;

  const queries = {
    search: search,
    page: page,
    limit: LIMIT_PER_PAGE,
    sortBy: sortBy,
    sort: sort,
  };

  const { getDataFromBackend } = useAxios();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITablehead,
  ) => {
    const isAsc = sortBy === property && sort === 'asc';
    setSort(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = passwords.map((n: any) => n.applicationName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(Number(newPage));
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  let isPasswordsFetching = false;
  const getPasswords = async() => {
    if(!isPasswordsFetching){
      try {
        const passwordsData: any = await getDataFromBackend(GET_PASSWORDS(queries));
        setTotalPages(passwordsData.data.totalPages);
        setPasswords(passwordsData.data.passwords);
      } catch (error) {
        console.log(error);
      }
    }
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
        <TableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
          >
            <Tablehead
              numSelected={selected.length}
              order={sort}
              orderBy={sortBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={passwords.length}
            />
            <TableBody>
              {passwords.map((row: IPasswordObject) => {
                const isItemSelected = isSelected(row.applicationName);
                const labelId = `enhanced-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.applicationName)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox' sx={{ pl: 1 }}>
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
                    <TableCell align='center'>{typeof row.password === 'object' ? '******' : row.password}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledPagination
          count={totalPages}
          page={page + 1}
          shape='rounded'
          onChange={(e, value) => handleChangePage(e, value)}
        />
      </Paper>
    </Box>
  );
};

export default memo(PasswordsTable);