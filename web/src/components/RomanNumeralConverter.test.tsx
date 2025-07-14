import { render, screen, waitFor } from '@testing-library/react';
import { RomanNumeralConverter } from './RomanNumeralConverter';
import '@testing-library/jest-dom';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import userEvent from '@testing-library/user-event';

describe('RomanNumeralConverter', () => {
  const setup = (onResult = jest.fn(), onError = jest.fn()) => {
    // As more tests are added, override render instead of adding a Provider in every test file.  See https://react-spectrum.adobe.com/react-spectrum/testing.html
    // With only one test file that needs it so far, it's not overriding render yet.
    render(
      <Provider theme={defaultTheme}>
        <RomanNumeralConverter onResult={onResult} onError={onError} />
      </Provider>
    );
    // Use getByRole('textbox', ...) for React Spectrum's NumberField input
    const input = screen.getByRole('textbox', { name: /enter a number/i });
    const button = screen.getByRole('button', { name: /convert/i });
    return { input, button, onResult, onError };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    global.fetch = jest.fn();
  });

  it('renders input and button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('button is disabled for invalid input', () => {
    const { button } = setup();
    expect(button).toBeDisabled();
  });

  it('button is enabled for valid input after blur', async () => {
    const { input, button } = setup();
    const user = userEvent.setup();
    await user.type(input, '123');
    await user.tab(); // blur
    expect(button).toBeEnabled();
  });

  it('button is enabled for valid input after pressing Enter', async () => {
    const { input, button } = setup();
    const user = userEvent.setup();
    await user.type(input, '123{enter}');
    expect(button).toBeEnabled();
  });

  it('calls onResult with output on successful conversion', async () => {
    const mockResult = { output: 'CXXIII' };
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockResult,
    });
    const { input, button, onResult } = setup();
    const user = userEvent.setup();
    await user.type(input, '123');
    await user.tab(); // blur
    await user.click(button);
    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith('CXXIII');
    });
  });

  it('calls onError with error message on failed fetch', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Bad request' }),
    });
    const { input, button, onError } = setup();
    const user = userEvent.setup();
    await user.type(input, '12'); // Valid so the button's enabled.  Response will be a bad request anyway
    await user.tab(); // blur
    await user.click(button);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Bad request');
    });
  });

  it('calls onError with network error on fetch throw', async () => {
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockRejectedValue(new Error('Network error'));
    const { input, button, onError } = setup();
    const user = userEvent.setup();
    await user.type(input, '123');
    await user.tab(); // blur
    await user.click(button);
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Network error');
    });
  });

  it('calls onResult with valid result, then clears, then with another valid result on two clicks', async () => {
    const mockResult1 = { output: 'CXXIII' };
    const mockResult2 = { output: 'CXLIV' };
    const fetchMock = global.fetch as jest.Mock;
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => mockResult1 })
      .mockResolvedValueOnce({ ok: true, json: async () => mockResult2 });
    const { input, button, onResult } = setup();
    const user = userEvent.setup();
    // First conversion
    await user.type(input, '123');
    await user.tab(); // blur
    await user.click(button);
    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith('CXXIII');
    });
    // Clear result (simulate parent clearing result)
    onResult('');
    // Second conversion
    await user.clear(input);
    await user.type(input, '144');
    await user.tab(); // blur
    await user.click(button);
    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith('CXLIV');
    });
    // Check call order
    expect(onResult.mock.calls[0][0]).toBe('CXXIII');
    expect(onResult.mock.calls[1][0]).toBe('');
    expect(onResult.mock.calls[2][0]).toBe('CXLIV');
  });

  it('calls backend and onResult when pressing Enter in the input', async () => {
    const mockResult = { output: 'CXXIII' };
    const fetchMock = global.fetch as jest.Mock;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockResult,
    });
    const { input, onResult } = setup();
    const user = userEvent.setup();
    await user.type(input, '123');
    await user.type(input, '{enter}');
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('query=123'),
        expect.objectContaining({ headers: expect.objectContaining({ 'X-Request-Id': expect.any(String) }) })
      );
      expect(onResult).toHaveBeenCalledWith('CXXIII');
    });
  });
}); 