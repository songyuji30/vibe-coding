import type { Todo } from '../services/todoService';
import { Checkbox, Table, ActionIcon, Card, Stack, Group, Badge, Text } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  mobile?: boolean;
}

export default function TodoList({ todos, onUpdate, onDelete, mobile }: TodoListProps) {
  if (!todos.length) return <Text c="dimmed">할 일이 없습니다.</Text>;

  // 모바일 카드형
  if (mobile) {
    return (
      <Stack gap="xs">
        {todos.map(todo => (
          <Card key={todo.id} shadow="xs" p="md" radius="md" withBorder>
            <Group align="flex-start" gap="sm">
              <Checkbox
                checked={todo.status === 'completed'}
                onChange={() => onUpdate(todo.id, { status: todo.status === 'active' ? 'completed' : 'active' })}
                color="teal"
                mr={8}
              />
              <Stack gap={2} style={{ flex: 1 }}>
                <Group gap={4}>
                  <Text fw={500} td={todo.status === 'completed' ? 'line-through' : undefined} c={todo.status === 'completed' ? 'dimmed' : undefined}>
                    {todo.title}
                  </Text>
                  <Badge color={todo.priority === 1 ? 'green' : todo.priority === 2 ? 'yellow' : 'red'}>
                    {todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'}
                  </Badge>
                </Group>
                <Text size="xs" c="dimmed">{todo.status === 'completed' ? 'Completed' : 'Incomplete'}</Text>
              </Stack>
              <ActionIcon color="blue" variant="subtle" onClick={() => {/* TODO: Edit modal */}}>
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red" variant="subtle" onClick={() => onDelete(todo.id)}>
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </Stack>
    );
  }

  // 데스크톱 테이블형
  return (
    <Table striped highlightOnHover withColumnBorders verticalSpacing="xs">
      <Table.Thead>
        <Table.Tr>
          <Table.Th> </Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Priority</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {todos.map(todo => (
          <Table.Tr key={todo.id}>
            <Table.Td>
              <Checkbox
                checked={todo.status === 'completed'}
                onChange={() => onUpdate(todo.id, { status: todo.status === 'active' ? 'completed' : 'active' })}
                color="teal"
              />
            </Table.Td>
            <Table.Td>
              <Text fw={500} td={todo.status === 'completed' ? 'line-through' : undefined} c={todo.status === 'completed' ? 'dimmed' : undefined}>
                {todo.title}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text>{todo.status === 'completed' ? 'Completed' : 'Incomplete'}</Text>
            </Table.Td>
            <Table.Td>
              <Badge color={todo.priority === 1 ? 'green' : todo.priority === 2 ? 'yellow' : 'red'}>
                {todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Group gap={4}>
                <ActionIcon color="blue" variant="subtle" onClick={() => {/* TODO: Edit modal */}}>
                  <IconEdit size={18} />
                </ActionIcon>
                <ActionIcon color="red" variant="subtle" onClick={() => onDelete(todo.id)}>
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
