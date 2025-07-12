import { NumberField } from '@adobe/react-spectrum';

interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function NumberInput({ value, onChange }: NumberInputProps) {
  return (
    <NumberField
      label="Enter a number (1-3999)"
      value={value}
      onChange={onChange}
      minValue={1}
      maxValue={3999}
      width="size-3000"
      formatOptions={{ maximumFractionDigits: 0 }}
    />
  );
} 