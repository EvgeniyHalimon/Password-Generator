import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GenerateButton } from './GenerateButton';

describe('Generate button', () => {
  const onClick = jest.fn();
  it('render with props', async () => {
    render(<GenerateButton title='Test title' onClick={onClick}/>);
    expect(screen.getByRole('button', { name : 'Test title' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');
    await userEvent.click(screen.getByText('Test title'));
    expect(onClick).toBeCalled();
    expect(onClick).toBeCalledTimes(1);
  });
});