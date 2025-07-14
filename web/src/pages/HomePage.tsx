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
    const traceId = crypto.randomUUID();
    if (inputValue && inputValue >= 1 && inputValue <= 3999) {
      try {
        console.log('Making API request with traceId:', traceId);
        const response = await fetch(`http://localhost:8080/romannumeral?query=${inputValue}`, {
          headers: {
            'X-Request-Id': traceId
          }
        });
        if (!response.ok) {
          const data = await response.json();
          setError(data.error || 'Unknown error');
          setShowError(true);
          return;
        }
        const data = await response.json();
        setResult(data.output);
      } catch (err: any) {
        console.log("Error for traceId", traceId, err);
        setError(err.message || 'Network error');
        setShowError(true);
      }
    } else {
      console.log("Invalid user submission", traceId, inputValue);
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