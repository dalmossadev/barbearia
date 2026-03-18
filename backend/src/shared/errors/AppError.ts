// src/shared/errors/AppError.ts

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number = 400,
    isOperational: boolean = true,
  ) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    // Necessário para instâncias de classes que estendem Error no TypeScript
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
