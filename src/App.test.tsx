import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('Check existing', () => {
    render(<App/>);
    expect(screen.getByRole('layout')).toBeInTheDocument();
    expect(screen.getByRole('password-generator-paper')).toBeInTheDocument();
    expect(screen.getByTestId('LightModeIcon')).toBeInTheDocument();
  });

  it('Switch theme', async () => {
    render(<App/>);
    const switchThemeButton = screen.getByTestId('switch-theme-button');
    await userEvent.click(switchThemeButton);
    expect(screen.getByTestId('DarkModeIcon')).toBeInTheDocument();
  });
});