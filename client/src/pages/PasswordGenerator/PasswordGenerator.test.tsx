import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxBar from '../../components/CheckboxBar/CheckboxBar';


import { WarningMessages, staticCheckboxPropsList } from '../../types/enums';
import { IPasswordOptions } from '../../types/types';

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
        passwordOptions={options} 
        updatePasswordOption={onClick}       
      />,
    );
      
    staticCheckboxPropsList.forEach(async(expression) => {
      await userEvent.click(screen.getAllByLabelText(expression.label)[0]);
      await userEvent.click(screen.getAllByLabelText(expression.label)[1]);
      expect(onClick).toHaveBeenCalledWith(expression.updatedField, true);
    });
    await userEvent.click(screen.getByTestId('generate-button'));
    expect(screen.getByRole('textbox')).not.toHaveValue(WarningMessages.LENGTH);
    expect(screen.getByRole('textbox')).not.toHaveValue(WarningMessages.OPTION);
  });
});