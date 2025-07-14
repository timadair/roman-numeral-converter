import '@testing-library/jest-dom';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import * as ReactSpectrum from '@adobe/react-spectrum';
import * as ColorSchemeContext from '../context/ColorSchemeContext';

// Mock the icons to simple text for easier querying
vi.mock('@spectrum-icons/workflow/Moon', () => ({ default: () => <span data-testid="moon-icon">Moon</span> }));
vi.mock('@spectrum-icons/workflow/Light', () => ({ default: () => <span data-testid="light-icon">Light</span> }));

const baseProviderMock = {
  theme: {},
  // defining scale here doesn't satisfy the linter.  I guess seeing type string isn't good enough when it must be a specific value, and it doesn't look up the value to see that it does match.
  breakpoints: {},
  version: '1',
};

describe('ColorSchemeToggle', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows Moon icon in light mode', () => {
    vi.spyOn(ReactSpectrum, 'useProvider').mockImplementation(() => ({ ...baseProviderMock, colorScheme: 'light', scale: 'medium' }));
    vi.spyOn(ColorSchemeContext, 'useColorScheme').mockImplementation(() => ({ toggleColorScheme: vi.fn(), colorScheme: 'light' }));

    render(<ColorSchemeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('light-icon')).not.toBeInTheDocument();
  });

  it('shows Light icon in dark mode', () => {
    vi.spyOn(ReactSpectrum, 'useProvider').mockImplementation(() => ({ ...baseProviderMock, colorScheme: 'dark', scale: 'medium' }));
    vi.spyOn(ColorSchemeContext, 'useColorScheme').mockImplementation(() => ({ toggleColorScheme: vi.fn(), colorScheme: 'dark' }));

    render(<ColorSchemeToggle />);
    expect(screen.getByTestId('light-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('calls toggleColorScheme when clicked', async () => {
    vi.spyOn(ReactSpectrum, 'useProvider').mockImplementation(() => ({ ...baseProviderMock, colorScheme: 'light', scale: 'medium' }));
    const toggleColorScheme = vi.fn();
    vi.spyOn(ColorSchemeContext, 'useColorScheme').mockImplementation(() => ({ toggleColorScheme, colorScheme: 'light' }));

    render(<ColorSchemeToggle />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(toggleColorScheme).toHaveBeenCalledTimes(1);
  });
}); 