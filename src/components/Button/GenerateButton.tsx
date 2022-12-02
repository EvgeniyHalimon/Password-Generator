import { Button } from '@mui/material';
import { FC } from 'react';

interface IGenerateButton{
    title: string,
    onClick: any
}

const GenerateButton: FC<IGenerateButton> = ({title, onClick}) => {
  return <Button variant='contained' sx={{m: '15px 0'}} onClick={onClick}>{title}</Button>;
};

export {GenerateButton};