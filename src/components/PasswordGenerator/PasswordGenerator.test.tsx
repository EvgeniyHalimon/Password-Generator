import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxBar from '../CheckboxBar/CheckboxBar';

import { IPasswordOptions } from '../types';

import PasswordGenerator from './PasswordGenerator';

describe('Password generator', () => {
  it('Check existing', () => {
    render(<PasswordGenerator/>);
    expect(screen.getByRole('password-generator-paper')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('form-group')).toBeInTheDocument();
    const passwordInput = screen.getByRole('textfield');
    expect(passwordInput).toHaveClass('container-box-input');
  });

  it('Check creating password', async () => {
    const onClick = jest.fn();
    render(<PasswordGenerator/>);
    const options: IPasswordOptions = {
      hasNumbers : false,
      hasSymbols : false,
      hasEngLowerCase : false,
      hasEngUpperCase : false,
      hasCyrLowerCase : false,
      hasCyrUpperCase : false,
    };
    render(
      <CheckboxBar 
        passwordOption={options} 
        setPasswordOption={onClick}       
      />,
    );
      
    const expressionArray = [
      /Allow English upper case letters/i,
      /Allow English lower case letters/i,
      /Allow Cyrillic upper case letters/i,
      /Allow Cyrillic lower case letters/i,
      /Allow numbers/i,
      /Allow special symbols/i,
    ];
      
    expressionArray.forEach(async(expression) => {
      await userEvent.click(screen.getAllByLabelText(expression)[0]);
      await userEvent.click(screen.getAllByLabelText(expression)[1]);
      expect(onClick).toHaveBeenCalledWith(true);
    });
    await userEvent.click(screen.getByTestId('generate-button'));
    /* expect(screen.getByRole('textbox')).toHaveDisplayValue(/[\w\p]+ug\[\]~`+!@#=$%^&*()_,.<>?;:'"|-\а-яА-Я\]/i); */
    /* [\w\p{sc=Cyrillic}]+ug\[\]~`+!@#=$%^&*()_,.<>?;:'"|-\u0400-\u04FF]* */
    screen.debug();
  });
});