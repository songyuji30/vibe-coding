import { useState } from 'react';
import { Button, TextInput, Group, Select } from '@mantine/core';

import { Modal, Drawer, useMediaQuery } from '@mantine/core';

export interface TodoFormProps {
  onAdd: (todo: { title: string; status: 'active' | 'completed'; priority: number }) => void;
  opened?: boolean;
  onClose?: () => void;
}

export default function TodoForm({ onAdd, opened, onClose }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState<'active' | 'completed'>('active');
  const isMobile = useMediaQuery('(max-width: 48em)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), status, priority });
    setTitle('');
    setPriority(1);
    setStatus('active');
    if (onClose) onClose();
  };

  const formContent = (
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

  if (typeof opened === 'boolean') {
    if (isMobile) {
      return (
        <Drawer opened={opened} onClose={onClose} title="할 일 추가" position="bottom" size="md" padding="md">
          {formContent}
        </Drawer>
      );
    }
    return (
      <Modal opened={opened} onClose={onClose} title="할 일 추가" centered>
        {formContent}
      </Modal>
    );
  }

  // 데스크톱 인라인 폼(기존)
  return formContent;
}
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
