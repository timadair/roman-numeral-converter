import { View, Header, Heading, Flex } from '@adobe/react-spectrum';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <View height="auto" overflow="hidden">
      <Header>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Heading level={3} marginStart="size-200">
            Roman Numeral Converter
          </Heading>
          <ColorSchemeToggle />
        </Flex>
      </Header>
      <View flex="1" overflow="auto">
        {children}
      </View>
    </View>
  );
}