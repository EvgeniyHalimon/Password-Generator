import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface INavigationLink{
    location: string,
    route: string,
    title: string
}

const NavigationLink:FC<INavigationLink> = ({ location, route, title }) => {
  return (
    <Typography className={`${location === route ? 'page-link-active' : null} page-link`} variant='h6'>
      <Link to={route}>{title}</Link>
    </Typography>
  );
};

export { NavigationLink };