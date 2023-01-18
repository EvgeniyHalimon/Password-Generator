import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

import './style.scss';

interface ILayout{
  children: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <Box className='App' role='layout'>
      {children}
    </Box>
  );
};

export { Layout };