import { Button } from '@adobe/react-spectrum';
import Moon from '@spectrum-icons/workflow/Moon';
import Light from '@spectrum-icons/workflow/Light';
import { useProvider } from '@adobe/react-spectrum';
import { useColorScheme } from '../context/ColorSchemeContext';

export function ColorSchemeToggle() {
  const { colorScheme } = useProvider();
  const { toggleColorScheme } = useColorScheme();

  return (
    <Button
      variant="secondary"
      onPress={toggleColorScheme}
      aria-label={`Switch to ${colorScheme === 'light' ? 'dark' : 'light'} mode`}
      marginEnd="size-200"
    >
      {colorScheme === 'light' ? <Moon /> : <Light />}
    </Button>
  );
} 