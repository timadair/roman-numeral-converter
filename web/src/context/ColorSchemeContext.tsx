// ThemeContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ColorSchemeContextType {
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

interface ColorSchemeProviderProps {
  children: ReactNode;
}

export function ColorSchemeProvider({ children }: ColorSchemeProviderProps) {
  // Get the browser's preferred color scheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    prefersDark ? 'dark' : 'light'
  );

  const toggleColorScheme = () => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider');
  }
  return context;
}