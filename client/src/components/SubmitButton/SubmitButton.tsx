import { Button } from '@mui/material';

import './style.scss';

const SubmitButton = () => {
  return(
    <Button 
      color='primary' 
      variant='contained' 
      fullWidth 
      type='submit' 
      className='button'
    >
        Submit
    </Button>
  );
};

export { SubmitButton };