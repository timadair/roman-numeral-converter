import { View, Button, Flex } from '@adobe/react-spectrum';
import { useState } from 'react';
import { RomanInscription } from '../components/RomanInscription';
import { NumberInput } from '../components/NumberInput';

export function HomePage() {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string>('');

  const handleConvert = () => {
    if (inputValue && inputValue >= 1 && inputValue <= 3999) {
      // TODO: Call the API to convert the number
      setResult(`Converted: ${inputValue} (placeholder)`);
    } else {
      setResult('Please enter a number between 1 and 3999');
    }
  };

  return (
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
            {"MMMCCCXXXIII"}
          </RomanInscription>
        )}
      </Flex>
    </View>
  );
} 