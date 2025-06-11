import { TextInput } from '@mantine/core';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <TextInput
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      placeholder={placeholder || 'Search...'}
      radius="md"
      size="md"
      mb="sm"
    />
  );
}
