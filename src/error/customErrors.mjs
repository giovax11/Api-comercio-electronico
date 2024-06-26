/**
 * Custom error class
 *
 * Extends the built-in Error class to provide additional error handling features
 */
export class CustomError extends Error {
  constructor(message, status) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message || "Ha ocurrido un error";

    this.status = status || 500;
  }
}
