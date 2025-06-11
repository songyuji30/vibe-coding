import { AppError } from '../types/common';

/**
 * Create a custom application error
 * @param message Error message
 * @param code Error code
 * @param statusCode HTTP status code
 * @param details Additional error details
 * @returns AppError instance
 */
export function createError(
  message: string,
  code: string,
  statusCode = 500,
  details?: Record<string, unknown>
): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  error.statusCode = statusCode;
  if (details) {
    error.details = details;
  }
  return error;
}

/**
 * Handle errors in a consistent way
 * @param error Error to handle
 * @param context Additional context for the error
 * @returns Formatted error response
 */
export function handleError(
  error: unknown,
  context?: Record<string, unknown>
): { status: number; error: string; code: string; details?: unknown } {
  console.error('Error occurred:', error, context);

  if (isAppError(error)) {
    return {
      status: error.statusCode || 500,
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      error: error.message || 'Internal Server Error',
      code: 'INTERNAL_ERROR',
    };
  }

  return {
    status: 500,
    error: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
}

/**
 * Type guard for AppError
 */
function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}
