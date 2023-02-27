import { styled, Pagination } from '@mui/material';

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  padding: '15px 0',
  '.MuiPagination-ul': {
    justifyContent: 'center',
  },
  '.MuiPaginationItem-root':{
    color: '#223354',
    fontWeight: 700,
    borderRadius: '6px',
  },
  '.MuiPaginationItem-root.Mui-selected':{
    color: 'white',
    backgroundColor: '#F15A5C',
    boxShadow: '0px 3px 12px 2px rgba(25, 117, 255, 0.35)',
  },
}));