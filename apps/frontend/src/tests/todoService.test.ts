import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from '../services/todoService';

// localStorage mocking
const mockStorage: Record<string, string> = {};

beforeEach(() => {
  vi.spyOn(window.localStorage, 'getItem').mockImplementation((key: string) => mockStorage[key] || null);
  vi.spyOn(window.localStorage, 'setItem').mockImplementation((key: string, value: string) => { mockStorage[key] = value; });
  vi.spyOn(window.localStorage, 'removeItem').mockImplementation((key: string) => { delete mockStorage[key]; });
  Object.keys(mockStorage).forEach(k => delete mockStorage[k]);
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('todoService (localStorage)', () => {
  it('초기 상태: getTodos()는 빈 배열 반환', () => {
    expect(getTodos()).toEqual([]);
  });

  it('addTodo()로 할 일 추가', () => {
    const todo = addTodo({ title: '테스트', status: 'active', priority: 1 });
    expect(todo.title).toBe('테스트');
    expect(todo.status).toBe('active');
    expect(todo.priority).toBe(1);
    expect(typeof todo.id).toBe('string');
    expect(getTodos().length).toBe(1);
  });

  it('updateTodo()로 할 일 수정', () => {
    const todo = addTodo({ title: '수정 전', status: 'active', priority: 2 });
    const updated = updateTodo(todo.id, { title: '수정 후', status: 'completed' });
    expect(updated?.title).toBe('수정 후');
    expect(updated?.status).toBe('completed');
    expect(updated?.id).toBe(todo.id);
  });

  it('deleteTodo()로 할 일 삭제', () => {
    const todo = addTodo({ title: '삭제 테스트', status: 'active', priority: 3 });
    const ok = deleteTodo(todo.id);
    expect(ok).toBe(true);
    expect(getTodos().find(t => t.id === todo.id)).toBeUndefined();
  });

  it('존재하지 않는 id로 update/delete 시 null/false 반환', () => {
    expect(updateTodo('없는-id', { title: 'x' })).toBeNull();
    expect(deleteTodo('없는-id')).toBe(false);
  });
});
