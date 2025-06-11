import { useState } from 'react';
import { Container, Title, Paper, Stack, Group, Affix, Button, rem } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchBar from './components/SearchBar';
import useTodos from './hooks/useTodos';
import './App.css';

function App() {
  const { filteredTodos, addTodo, updateTodo, deleteTodo, search, setSearch } = useTodos();
  const [formOpen, setFormOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 48em)'); // Mantine 기본: sm = 48em

  return (
    <Container size="md" px="xs" pt="md" style={{ minHeight: '100vh' }}>
      <Paper shadow="md" p="md" radius="md" withBorder>
        <Stack gap="sm">
          <Title order={2} ta="center" mb="sm">Todo App</Title>
          {isMobile ? (
            <>
              <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
              <TodoList todos={filteredTodos} onUpdate={updateTodo} onDelete={deleteTodo} mobile />
              <Affix position={{ bottom: 24, right: 24 }}>
                <Button size="lg" radius="xl" leftSection={<IconPlus size={20} />} onClick={() => setFormOpen(true)}>
                  추가
                </Button>
              </Affix>
            </>
          ) : (
            <>
              <Group justify="space-between">
                <SearchBar value={search} onChange={setSearch} placeholder="할 일 검색..." />
                <Button onClick={() => setFormOpen(true)} leftSection={<IconPlus size={18} />}>Add</Button>
              </Group>
              <TodoList todos={filteredTodos} onUpdate={updateTodo} onDelete={deleteTodo} />
            </>
          )}

          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <TodoList todos={filteredTodos} onUpdate={updateTodo} onDelete={deleteTodo} />
          </MediaQuery>
        </Stack>
      </Paper>
      <TodoForm onAdd={addTodo} opened={formOpen} onClose={() => setFormOpen(false)} />
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Affix position={{ bottom: rem(24), right: rem(24) }}>
          <Button size="xl" radius="xl" color="blue" style={{ boxShadow: '0 2px 12px #0002' }} onClick={() => setFormOpen(true)}>
            <IconPlus size={28} />
          </Button>
        </Affix>
      </MediaQuery>
    </Container>
  );
}

export default App;
