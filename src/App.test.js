import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/One.com Code Challenge/i);
  expect(header).toBeInTheDocument();
});
