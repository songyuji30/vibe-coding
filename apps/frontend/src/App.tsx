import { useMediaQuery } from '@mantine/hooks';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodos from './hooks/useTodos';
import './App.css';

function App() {
  const { filteredTodos, addTodo, updateTodo, deleteTodo } = useTodos();

  const isMobile = useMediaQuery('(max-width: 48em)'); // Mantine 기본: sm = 48em

  return (
    <div className="app-bg">
      <div className="app-center-wrapper">
        <div className="app-card">
          <div className="app-header">Todo App</div>
          <div className="todo-inline-form-wrapper">
            <TodoForm onAdd={addTodo} />
          </div>
          <div className="todo-list-wrapper">
            <TodoList todos={filteredTodos} onUpdate={updateTodo} onDelete={deleteTodo} mobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
