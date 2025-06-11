import type { Todo } from '../services/todoService';
import { Checkbox, Table, ActionIcon, Group, Badge, Text } from '@mantine/core';
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 2px 8px #0001',
              padding: '10px 14px',
              marginBottom: 4,
              minHeight: 48
            }}
          >
            <input
              type="checkbox"
              checked={todo.status === 'completed'}
              onChange={() => onUpdate(todo.id, { status: todo.status === 'active' ? 'completed' : 'active' })}
              style={{ marginRight: 10, accentColor: '#1677ff', width: 20, height: 20 }}
            />
            <span
              style={{
                flex: 1,
                color: todo.status === 'completed' ? '#aaa' : '#222',
                textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                fontWeight: 600,
                fontSize: 17,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginRight: 8
              }}
            >
              {todo.title}
            </span>
            <span
              style={{
                background: todo.priority === 1 ? '#22c55e' : todo.priority === 2 ? '#facc15' : '#ef4444',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 6,
                padding: '4px 12px',
                marginRight: 8
              }}
            >
              {todo.priority === 1 ? 'Low' : todo.priority === 2 ? 'Medium' : 'High'}
            </span>
            <button
              onClick={() => onDelete(todo.id)}
              style={{
                background: '#222',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 10px',
                fontSize: 15,
                marginLeft: 2,
                cursor: 'pointer'
              }}
              aria-label="삭제"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    );
  }

  // 데스크톱 테이블형
  return (
    <div style={{ width: '100%' }} className="todo-list-table-wrapper">
      <Table
        striped
        highlightOnHover
        withColumnBorders
        verticalSpacing="xs"
        style={{ width: '100%' }}
      >
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
            <Table.Td
  style={{
    textDecoration: todo.status === 'completed' ? 'line-through' : 'none'
  }}
>
  <span
    style={{
      color: todo.status === 'completed' ? '#aaa' : '#222',
      fontWeight: 600,
      fontSize: 17
    }}
  >
    {todo.title}
  </span>
</Table.Td>
            <Table.Td>
              <span
                style={{
                  color: todo.status === 'completed' ? '#aaa' : '#222',
                  fontWeight: 500,
                  fontSize: 15
                }}
              >
                {todo.status === 'completed' ? 'Completed' : 'Incomplete'}
              </span>
            </Table.Td>
            <Table.Td>
              <Badge className={
  todo.priority === 1 ? 'badge-low' : todo.priority === 2 ? 'badge-medium' : 'badge-high'
}>
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
    </div>
  );
}
