import { render, screen } from '@testing-library/react';

import PasswordInput, { copyTextToClipboard } from './PasswordInput';

let clipboardContents = '';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(text => { clipboardContents = text; }),
    readText: () => 'password',
  },
});

describe('Password input tests', () => {
  const setClipboardOpen = jest.fn();
  it('check existing elements and classes', () => {
    render(<PasswordInput openClipboard={false} setClipboardOpen={setClipboardOpen} password='password' />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('container')).toBeInTheDocument();
    expect(screen.getByRole('textfield')).toBeInTheDocument();
    expect(screen.getByTestId('ContentCopyIcon')).toBeInTheDocument();
    expect(screen.queryByRole('alert-container')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('container-box-icon-button', 'MuiIconButton-root');
    expect(screen.getByRole('container')).toHaveClass('container-box', 'MuiBox-root');
    expect(screen.getByRole('textfield')).toHaveClass('container-box-input');
    expect(screen.getByTestId('ContentCopyIcon')).toHaveClass('MuiSvgIcon-root');
  });

  it('check attributes', () => {
    render(<PasswordInput openClipboard={false} setClipboardOpen={setClipboardOpen} password='password' />);
    expect(screen.getByRole('textbox')).toHaveAttribute('value');
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  it('check Snackbar', () => {
    render(<PasswordInput openClipboard={true} setClipboardOpen={setClipboardOpen} password='password' />);
    expect(screen.getByRole('alert-container')).toBeInTheDocument();
    expect(screen.getByRole('alert-container')).toHaveClass('MuiSnackbar-root MuiSnackbar-anchorOriginTopCenter');
    expect(screen.getByTestId('SuccessOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
    expect(screen.getByText(/copied to clipboard/i)).toHaveClass('MuiAlert-message');
  });

  it('copies a string to the clipboard', async () => {
    const password = 'password';
    render(<PasswordInput openClipboard={true} setClipboardOpen={setClipboardOpen} password={password} />);
    copyTextToClipboard(password, jest.fn());
    expect(navigator.clipboard.readText()).toBe('password');
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(password);
  });    
});