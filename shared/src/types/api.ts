import { PaginationParams } from './common';

/**
 * Todo item type
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userId: string;
}

/**
 * Todo creation DTO
 */
export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

/**
 * Todo update DTO
 */
export type UpdateTodoDto = Partial<CreateTodoDto>;

/**
 * Todo query parameters
 */
export interface TodoQueryParams extends PaginationParams {
  status?: Todo['status'] | Todo['status'][];
  priority?: Todo['priority'] | Todo['priority'][];
  search?: string;
}
