import { render, screen, fireEvent } from '@testing-library/react';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import '@testing-library/jest-dom';

import * as ReactSpectrum from '@adobe/react-spectrum';
import * as ColorSchemeContext from '../context/ColorSchemeContext';

// Mock the context and useProvider from React Spectrum
jest.mock('@adobe/react-spectrum', () => {
    const actual = jest.requireActual('@adobe/react-spectrum');
    return {
      ...actual,
      useProvider: jest.fn(),
    };
  });
  
  jest.mock('../context/ColorSchemeContext', () => ({
    useColorScheme: jest.fn(),
  }));

const useProvider = ReactSpectrum.useProvider as jest.Mock;
const useColorScheme = ColorSchemeContext.useColorScheme as jest.Mock;

describe('ColorSchemeToggle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows Moon icon when theme is light', () => {
    useProvider.mockReturnValue({ colorScheme: 'light' });
    useColorScheme.mockReturnValue({ toggleColorScheme: jest.fn() });
    render(<ColorSchemeToggle />);
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
    expect(screen.getByTestId('spectrum-icon-Moon')).toBeInTheDocument();
  });

  it('shows Light icon when theme is dark', () => {
    useProvider.mockReturnValue({ colorScheme: 'dark' });
    useColorScheme.mockReturnValue({ toggleColorScheme: jest.fn() });
    render(<ColorSchemeToggle />);
    expect(screen.getByLabelText(/switch to light mode/i)).toBeInTheDocument();
    expect(screen.getByTestId('spectrum-icon-Light')).toBeInTheDocument();
  });

  it('calls toggleColorScheme when button is clicked', () => {
    useProvider.mockReturnValue({ colorScheme: 'light' });
    const toggleColorScheme = jest.fn();
    useColorScheme.mockReturnValue({ toggleColorScheme });
    render(<ColorSchemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleColorScheme).toHaveBeenCalled();
  });
}); 