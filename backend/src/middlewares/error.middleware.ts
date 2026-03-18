// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express'
import { AppError } from '../shared/errors/AppError'
import { env } from '../config/env'

interface ErrorResponse {
  status: string
  statusCode: number
  message: string
  stack?: string
}

export class ErrorMiddleware {
  public static handle(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    if (error instanceof AppError) {
      const response: ErrorResponse = {
        status: 'error',
        statusCode: error.statusCode,
        message: error.message,
      }

      res.status(error.statusCode).json(response)
      return
    }

    // Erro inesperado — não expõe detalhes em produção
    console.error('❌ Erro inesperado:', error)

    const response: ErrorResponse = {
      status: 'error',
      statusCode: 500,
      message:
        env.NODE_ENV === 'production'
          ? 'Erro interno do servidor'
          : error.message,
      ...(env.NODE_ENV !== 'production' && { stack: error.stack }),
    }

    res.status(500).json(response)
  }
}
