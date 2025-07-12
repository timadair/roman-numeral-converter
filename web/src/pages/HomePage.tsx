import { View, Button, Flex, DialogContainer, AlertDialog } from '@adobe/react-spectrum';
import { useState } from 'react';
import { RomanInscription } from '../components/RomanInscription';
import { NumberInput } from '../components/NumberInput';

export function HomePage() {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleConvert = async () => {
    if (inputValue && inputValue >= 1 && inputValue <= 3999) {
      try {
        const response = await fetch(`http://localhost:8080/romannumeral?query=${inputValue}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Unknown error');
          setShowError(true);
          return;
        }
        const data = await response.json();
        setResult(data.output);
      } catch (err: any) {
        setError(err.message || 'Network error');
        setShowError(true);
      }
    } else {
      setResult('Please enter a number between 1 and 3999');
    }
  };

  return (
    <>
      <View padding="size-1000">
        <Flex direction="column" gap="size-300" alignItems="center">
          <Flex gap="size-200" alignItems="end">
            <NumberInput 
              value={inputValue}
              onChange={setInputValue}
            />
            <Button 
              variant="primary" 
              onPress={handleConvert}
              isDisabled={!inputValue || inputValue < 1 || inputValue > 3999}
            >
              Convert
            </Button>
          </Flex>
          {result && (
            <RomanInscription>
              {result}
            </RomanInscription>
          )}
        </Flex>
      </View>
      {/* Dialogs currently break the page, likely from  Polyfill issue with Vite.  Not fixed by workaround in https://github.com/adobe/react-spectrum/discussions/8189 */}
      {/* Setting aside because everything is solid enough that I can't get the call to the backend to fail unless I fabricate an error.  I'm sure I just lack imagination. */}
      <DialogContainer onDismiss={() => setShowError(false)}>
        {showError && 
          <AlertDialog
            title="Error"
            variant="error"
            primaryActionLabel="OK"
            onPrimaryAction={() => setShowError(false)}
          >
            {error || "An unknown error occurred."}
          </AlertDialog>
        }
      </DialogContainer>
    </>
  );
} 