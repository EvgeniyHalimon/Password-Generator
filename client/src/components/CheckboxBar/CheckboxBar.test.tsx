import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { staticCheckboxPropsList } from '../../types/enums';
import { IPasswordOptions } from '../../types/types';

import CheckboxBar from './CheckboxBar';

describe('CheckboxBar', () =>{
  const onClick = jest.fn();
  it('check components', () => {
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
    expect(screen.getByText(/choose options/i)).toBeInTheDocument();
    staticCheckboxPropsList.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('form-control-label')).toHaveLength(6);
  });

  it('test onClick', async () => {
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

    staticCheckboxPropsList.forEach(async({ label }) => {
      await userEvent.click(screen.getByLabelText(label));
      expect(onClick).toHaveBeenCalledWith(true);
    });
  });
});