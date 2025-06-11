import React, { useState } from 'react';

const PRIORITY_OPTIONS = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' }
];

export interface TodoFormProps {
  onAdd: (todo: { title: string; status: 'active' | 'completed'; priority: number }) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState<'active' | 'completed'>('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    // string priority → number 변환
    let priorityNum = 1;
    if (priority === 'medium') priorityNum = 2;
    else if (priority === 'high') priorityNum = 3;
    onAdd({ title: title.trim(), status, priority: priorityNum });
    setTitle('');
    setPriority('low');
    setStatus('active');
  };

  return (
    <form className="todo-inline-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        className="todo-input"
        placeholder="할 일 명을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        autoFocus
        maxLength={40}
      />
      <select
        className="todo-priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        className="todo-add-btn"
        type="submit"
        disabled={!title.trim()}
      >
        추가
      </button>
    </form>
  );
}

