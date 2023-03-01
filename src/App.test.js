import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders header', () => {
    render(<App />);
    const header = screen.getByText(/One.com Code Challenge/i);
    expect(header).toBeInTheDocument();
  });

  describe('calculator', () => {
    beforeAll(jest.useFakeTimers);

    afterAll(jest.useRealTimers);

    describe('error handling', () => {
      it('should show a warning if the user types a letter into the date', async () => {
        render(<App />);

        const [from] = screen.getAllByRole('textbox');

        fireEvent.change(from, { target: { value: 'a-b-c' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByText(
          'Year must be a valid number with no commas or periods or letters'
        )).toBeInTheDocument();

        fireEvent.change(from, { target: { value: '2023-a-b' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByText(
          'Month must be a valid number with no commas or periods or letters'
        )).toBeInTheDocument();

        fireEvent.change(from, { target: { value: '2023-01-a' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByText(
          'Day must be a valid number with no commas or periods or letters'
        )).toBeInTheDocument();
      });

      it('should show a warning if the user types a decimal separator or special character into the date', async () => {
        render(<App />);

        const [from] = screen.getAllByRole('textbox');

        fireEvent.change(from, { target: { value: '20.23-01-01' }});
        act(() => { jest.advanceTimersByTime(500); });
      });

      it('should show a warning if the user types the date in the wrong format', async () => {
        render(<App />);

        const from = screen.getAllByRole('textbox')[0];

        fireEvent.change(from, { target: { value: '01-2023-01' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByText('Month must be greater than 0 and less than 13')).toBeInTheDocument();
      });

      it('should show a warning if the user tries to compare dates from before the Julian calendar was introduced', async () => {
        render(<App />);

        const from = screen.getAllByRole('textbox')[0];

        fireEvent.change(from, { target: { value: '-46-01-01' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByText(
          `Year must be greater than -46 and less than ${Number.MAX_SAFE_INTEGER}`
        )).toBeInTheDocument();
      });
    });

    describe('happy path', () => {
      it('should run the calculation when both dates are filled out correctly', async () => {
        render(<App />);

        const [from, to] = screen.getAllByRole('textbox');

        fireEvent.change(from, { target: { value: '2023-01-01' }});
        fireEvent.change(to, { target: { value: '2023-01-11' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByTestId('result-txt')).toBeInTheDocument();

        expect(screen.getByText('10 days')).toBeInTheDocument();
      });

      it('should handle the user inputting the dates in the opposite order', async () => {
        render(<App />);

        const [from, to] = screen.getAllByRole('textbox');

        fireEvent.change(from, { target: { value: '2023-01-11' }});
        fireEvent.change(to, { target: { value: '2023-01-01' }});
        act(() => { jest.advanceTimersByTime(500); });

        expect(await screen.findByTestId('result-txt')).toBeInTheDocument();

        expect(screen.getByText('10 days')).toBeInTheDocument();
      });
    });
  });
});

