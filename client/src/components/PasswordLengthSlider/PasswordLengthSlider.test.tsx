import { fireEvent, render, screen } from '@testing-library/react';

import PasswordLengthSlider from './PasswordLengthSlider';

describe('Password length slider', () => {
  const setLength = jest.fn();
  it('check components', () => {
    render(<PasswordLengthSlider setLength={setLength}/>);
    expect(screen.getByText(/password length/i)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByDisplayValue(16)).toBeDefined();
  });

  it('onChange slider', () => {
    render(<PasswordLengthSlider setLength={setLength}/>);
    fireEvent.change(screen.getByRole('slider'), { target: { value: 25 } });
    expect(screen.getByDisplayValue(25)).toBeDefined();
  });
});