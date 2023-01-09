import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxBar from '../CheckboxBar/CheckboxBar';

import { Labels, PasswordOptionsField } from '../enums';
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
      { label: Labels.ENG_UPPER, key: PasswordOptionsField.HAS_ENG_UPPER },
      { label: Labels.ENG_LOWER, key: PasswordOptionsField.HAS_ENG_LOWER },
      { label: Labels.CYR_UPPER, key: PasswordOptionsField.HAS_CYR_UPPER },
      { label: Labels.CYR_LOWER, key: PasswordOptionsField.HAS_CYR_LOWER },
      { label: Labels.NUMBERS, key: PasswordOptionsField.HAS_NUMBERS },
      { label: Labels.SYMBOLS, key: PasswordOptionsField.HAS_SYMBOLS },
    ];
      
    expressionArray.forEach(async(expression) => {
      await userEvent.click(screen.getAllByLabelText(expression.label)[0]);
      await userEvent.click(screen.getAllByLabelText(expression.label)[1]);
      expect(onClick).toHaveBeenCalledWith(expression.key, true);
    });
    await userEvent.click(screen.getByTestId('generate-button'));
    expect(screen.getByRole('textbox')).not.toHaveValue('Password length must not be 0. Set at least 16');
    expect(screen.getByRole('textbox')).not.toHaveValue('You must choose at least 1 option');
    screen.debug();
    /* expect(screen.getByRole('textbox')).toHaveDisplayValue(/[\w\p]+ug\[\]~`+!@#=$%^&*()_,.<>?;:'"|-\а-яА-Я\]/i); */
    /* [\w\p{sc=Cyrillic}]+ug\[\]~`+!@#=$%^&*()_,.<>?;:'"|-\u0400-\u04FF]* */
  });
});