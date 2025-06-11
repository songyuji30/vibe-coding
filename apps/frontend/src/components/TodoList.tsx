import type { Todo } from '../services/todoService';
import { Group, Paper, Text, Button, Badge } from '@mantine/core';

export interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (!todos.length) return <Text c="dimmed">할 일이 없습니다.</Text>;
  return (
    <div>
      {todos.map(todo => (
        <Paper key={todo.id} shadow="xs" p="md" mb="sm">
          <Group justify="space-between">
            <Group>
              <Badge color={todo.status === 'completed' ? 'teal' : 'blue'}>
                {todo.status === 'completed' ? '완료' : '진행중'}
              </Badge>
              <Text fw={500}>{todo.title}</Text>
              <Badge color="gray">우선순위: {todo.priority}</Badge>
            </Group>
            <Group>
              <Button size="xs" variant="outline" color="teal" onClick={() => onUpdate(todo.id, { status: todo.status === 'active' ? 'completed' : 'active' })}>
                {todo.status === 'active' ? '완료처리' : '되돌리기'}
              </Button>
              <Button size="xs" variant="outline" color="red" onClick={() => onDelete(todo.id)}>
                삭제
              </Button>
            </Group>
          </Group>
        </Paper>
      ))}
    </div>
  );
}
