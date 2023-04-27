import { TableCell } from '@mui/material';
import { FC, useRef, useState } from 'react';

import { IEncryptedPassword } from '../../types/types';

interface IMutableTableCell{
    id: string,
    getDecryptedPasswords(e: any, id: string): void,
    passwordField: IEncryptedPassword | string
}

const MutableTableCell: FC<IMutableTableCell> = ({ id, getDecryptedPasswords, passwordField }) => {
  const [openInnerPasswordInput, setOpenInnerPasswordInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onKeyDown = (e: any) => {
    if(e.key === 'Enter' && inputRef?.current) {
      inputRef.current?.blur();
      setOpenInnerPasswordInput(false);
    }
  };

  const onClick = () => {
    setOpenInnerPasswordInput(!openInnerPasswordInput);
    inputRef.current?.blur();
  };

  return (
    <TableCell align='center' onClick={() => onClick()}>
      {openInnerPasswordInput ? 
        <input 
          autoFocus
          ref={inputRef}
          placeholder='Enter your inner password'
          onBlur={(e) => getDecryptedPasswords(e, id)}
          onKeyDown={onKeyDown}
        /> :
        <>{passwordField}</>
      }
    </TableCell>
  );
};

export default MutableTableCell;