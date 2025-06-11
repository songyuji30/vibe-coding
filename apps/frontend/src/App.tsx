import { Container, Title, Paper, Stack } from '@mantine/core';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';
import './App.css';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <Container size="xs" pt="lg">
      <Paper shadow="md" p="lg" radius="md">
        <Stack>
          <Title order={2} ta="center">Todo List</Title>
          <TodoForm onAdd={addTodo} />
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        </Stack>
      </Paper>
    </Container>
  );
}


export default App
