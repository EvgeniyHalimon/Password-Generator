import { Typography, Slider } from '@mui/material';
import { memo, FC } from 'react';

interface IPasswordGeneratorLength{
  setLength: (value: number) => void
}

const PasswordLengthSlider: FC<IPasswordGeneratorLength> = ({ setLength }) => {
  return (
    <>
      <Typography component='h1'>Password length</Typography>
      <Slider
        valueLabelDisplay='auto'
        defaultValue={16}
        onChange={(e: any) => setLength(e.target.value)}
      />
    </>
  );
};

export default memo(PasswordLengthSlider);