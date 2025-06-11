import { useState } from 'react';
import { Button, TextInput, Group, Select } from '@mantine/core';

export interface TodoFormProps {
  onAdd: (todo: { title: string; status: 'active' | 'completed'; priority: number }) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState<'active' | 'completed'>('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), status, priority });
    setTitle('');
    setPriority(1);
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" gap="md">
        <TextInput
          label="할 일"
          placeholder="할 일 입력"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Select
          label="상태"
          value={status}
          onChange={val => setStatus(val as 'active' | 'completed')}
          data={[
            { value: 'active', label: '진행중' },
            { value: 'completed', label: '완료' },
          ]}
        />
        <TextInput
          label="우선순위"
          type="number"
          min={1}
          max={5}
          value={priority}
          onChange={e => setPriority(Number(e.target.value))}
        />
        <Button type="submit">추가</Button>
      </Group>
    </form>
  );
}
