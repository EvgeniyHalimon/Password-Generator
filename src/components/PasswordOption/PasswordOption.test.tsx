import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordOption from './PasswordOption';

describe('Password option', () => {
  const onClick = jest.fn();
  it('check existing of component', () => {
    render(<PasswordOption isChecked={false} updatePasswordOption={onClick} label='Allow numbers' updatedField='hasNumbers'/>);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('form-control-label')).toBeInTheDocument();
    //check if checkboxes is not checked
    expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon')).toHaveLength(1);
  });

  it('test onClick', async () => {
    const mockOnClick = jest.fn();
    render(<PasswordOption isChecked={false} updatePasswordOption={mockOnClick} label='Allow numbers' updatedField='hasNumbers'/>);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockOnClick).toHaveBeenCalledWith('hasNumbers',true);
  });
});