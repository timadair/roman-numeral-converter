import { NumberField, Button, Flex } from '@adobe/react-spectrum';
import { useState } from 'react';

interface RomanNumeralConverterProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
}

export function RomanNumeralConverter({ onResult, onError }: RomanNumeralConverterProps) {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    const traceId = crypto.randomUUID();
    if (inputValue && inputValue >= 1 && inputValue <= 3999) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/romannumeral?query=${inputValue}`, {
          headers: {
            'X-Request-Id': traceId
          }
        });
        if (!response.ok) {
          const data = await response.json();
          onError(data.error || 'Unknown error');
          setLoading(false);
          return;
        }
        const data = await response.json();
        onResult(data.output);
      } catch (err: any) {
        onError(err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    } else {
      onResult('Please enter a number between 1 and 3999');
    }
  };

  const handleInputChange = (val: number | undefined) => {
    setInputValue(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && inputValue && inputValue >= 1 && inputValue <= 3999) {
      handleConvert();
    }
  };

  return (
    <Flex gap="size-200" alignItems="end">
      <NumberField
        label="Enter a number (1-3999)"
        value={inputValue}
        onChange={handleInputChange}
        minValue={1}
        maxValue={3999}
        width="size-3000"
        formatOptions={{ maximumFractionDigits: 0 }}
        onKeyUp={handleKeyDown}
      />
      <Button
        variant="primary"
        onPress={handleConvert}
        isDisabled={!inputValue || inputValue < 1 || inputValue > 3999 || loading}
        isPending={loading}
      >
        Convert
      </Button>
    </Flex>
  );
} 