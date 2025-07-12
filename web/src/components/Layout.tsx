import { View, Header, Heading, Button, Flex } from '@adobe/react-spectrum';
import { useProvider } from '@adobe/react-spectrum';
import Moon from '@spectrum-icons/workflow/Moon';
import Light from '@spectrum-icons/workflow/Light';
import { useColorScheme } from '../context/ColorSchemeContext';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { colorScheme } = useProvider();
  const { toggleColorScheme } = useColorScheme();

  return (
    <View height="auto" overflow="hidden">
      <Header>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Heading level={3} marginStart="size-200">
            Roman Numeral Converter
          </Heading>
          <Button
            variant="secondary"
            onPress={toggleColorScheme}
            aria-label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
            marginEnd="size-200"
          >
            {colorScheme === 'light' ? <Moon /> : <Light />}
          </Button>
        </Flex>
      </Header>
      <View flex="1" overflow="auto">
        {children}
      </View>
    </View>
  );
}