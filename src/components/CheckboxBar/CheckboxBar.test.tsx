import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxBar from './CheckboxBar';

describe('CheckboxBar', () =>{
  const onClick = jest.fn();
  it('check components', () => {
    render(
      <CheckboxBar 
        hasEngUpperCase={false} 
        setHasEngUpperCase={onClick} 
        hasEngLowerCase={false} 
        setHasEngLowerCase={onClick} 
        hasCyrUpperCase={false} 
        setHasCyrUpperCase={onClick} 
        hasCyrLowerCase={false} 
        setHasCyrLowerCase={onClick} 
        hasNumbers={false} 
        setHasNumbers={onClick} 
        hasSymbols={false} 
        setHasSymbols={onClick}        
      />,
    );
    expect(screen.getByText(/choose options/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow English upper case letters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow English lower case letters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow Cyrillic upper case letters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow Cyrillic lower case letters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow numbers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Allow special symbols/i)).toBeInTheDocument();
    expect(screen.getAllByRole('form-control-label')).toHaveLength(6);
  });

  it('test onClick', async () => {
    render(
      <CheckboxBar 
        hasEngUpperCase={false} 
        setHasEngUpperCase={onClick} 
        hasEngLowerCase={false} 
        setHasEngLowerCase={onClick} 
        hasCyrUpperCase={false} 
        setHasCyrUpperCase={onClick} 
        hasCyrLowerCase={false} 
        setHasCyrLowerCase={onClick} 
        hasNumbers={false} 
        setHasNumbers={onClick} 
        hasSymbols={false} 
        setHasSymbols={onClick}        
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
      await userEvent.click(screen.getByLabelText(expression));
      expect(onClick).toHaveBeenCalledWith(true);
    });
  });
});