import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordOption from './PasswordOption';

describe('Password option', () => {
  const onClick = jest.fn();
  it('check existing of component', () => {
    render(<PasswordOption flag={false} setFlag={onClick} label='test label'/>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('form-control-label')).toBeInTheDocument()
    //check if checkbox is not checked
    expect(screen.getByTestId('CheckBoxOutlineBlankIcon')).toBeInTheDocument()
    screen.debug()
  });

  it('test onClick', async () => {
    const mockOnClick = jest.fn()
    render(<PasswordOption flag={false} setFlag={mockOnClick} label='test label'/>)
    
    const b = screen.getByRole('checkbox') as HTMLElement
    await userEvent.click(b)
    expect(mockOnClick).toHaveBeenCalledWith(true)
    screen.debug()
  })
});