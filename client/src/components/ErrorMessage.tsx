import { FC } from 'react';

interface IErrorMessage{
    message: string
}

const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
  return (
    <div>{message}</div>
  );
};

export default ErrorMessage;