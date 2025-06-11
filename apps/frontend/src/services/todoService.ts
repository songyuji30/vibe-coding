// todoService.ts
// 로컬스토리지 기반 Todo CRUD 서비스 (TDD)

export type Todo = {
  id: string;
  title: string;
  status: 'completed' | 'active';
  priority: number;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'todos';

export function getTodos(): Todo[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Todo[];
  } catch {
    return [];
  }
}

export function addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Todo {
  const todos = getTodos();
  const now = new Date().toISOString();
  const newTodo: Todo = {
    ...todo,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newTodo, ...todos]));
  return newTodo;
}

export function updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo | null {
  const todos = getTodos();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return null;
  const updated: Todo = {
    ...todos[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  todos[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return updated;
}

export function deleteTodo(id: string): boolean {
  const todos = getTodos();
  const filtered = todos.filter(t => t.id !== id);
  if (filtered.length === todos.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}
