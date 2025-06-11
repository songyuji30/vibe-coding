import { useState } from 'react';
import { Container, Title, Paper, Stack } from '@mantine/core';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo, type Todo } from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => getTodos());

  const handleAdd = (input: { title: string; status: 'active' | 'completed'; priority: number }) => {
    const newTodo = addTodo(input);
    setTodos([newTodo, ...getTodos()]);
  };

  const handleUpdate = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    const updated = updateTodo(id, updates);
    if (updated) setTodos([...getTodos()]);
  };

  const handleDelete = (id: string) => {
    const ok = deleteTodo(id);
    if (ok) setTodos([...getTodos()]);
  };

  return (
    <Container size="xs" pt="lg">
      <Paper shadow="md" p="lg" radius="md">
        <Stack>
          <Title order={2} ta="center">Todo List</Title>
          <TodoForm onAdd={handleAdd} />
          <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
        </Stack>
      </Paper>
    </Container>
  );
}


export default App
