import { Button } from '@mui/material';
import { FC } from 'react';

interface IGenerateButton{
  title: string,
  onClick(): void
}

const GenerateButton: FC<IGenerateButton> = ({ title, onClick }) => {
  return <Button variant='contained' data-testid='generate-button' sx={{ m: '15px 0' }} onClick={onClick}>{title}</Button>;
};

export { GenerateButton };