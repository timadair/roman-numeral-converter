import { View, Flex, DialogContainer, AlertDialog } from '@adobe/react-spectrum';
import { useState } from 'react';
import { RomanInscription } from '../components/RomanInscription';
import { RomanNumeralConverter } from '../components/RomanNumeralConverter';

export function HomePage() {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleResult = (res: string) => {
    setResult(res);
  };

  const handleError = (err: string) => {
    setError(err);
    setShowError(true);
  };

  return (
    <>
      <View padding="size-1000">
        <Flex direction="column" gap="size-300" alignItems="center">
          <RomanNumeralConverter
            onResult={handleResult}
            onError={handleError}
          />
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