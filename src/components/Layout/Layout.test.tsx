import { render, screen } from '@testing-library/react';

import { Layout } from './Layout';

describe('Layout', () => {
  it('Check existing', () => {
    render(<Layout><div></div></Layout>);
    expect(screen.getByRole('layout')).toBeInTheDocument();
    expect(screen.getByRole('layout')).toHaveClass('App');
    screen.debug();
  });
});