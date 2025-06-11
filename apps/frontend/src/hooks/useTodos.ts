import { useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo, type Todo } from '../services/todoService';

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => getTodos());
  const [search, setSearch] = useState('');

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

  const filteredTodos = search.trim()
    ? todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
    : todos;

  return {
    todos,
    search,
    setSearch,
    filteredTodos,
    addTodo: handleAdd,
    updateTodo: handleUpdate,
    deleteTodo: handleDelete,
  };
}
