// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '../shared/errors/AppError'
import { env } from '../config/env'

interface JwtPayload {
  sub: string
}

// Extendendo o tipo Request do Express para incluir o userId
declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

export class AuthMiddleware {
  public static handle(req: Request, _res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Token de autenticação não fornecido', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
      req.userId = decoded.sub
      next()
    } catch {
      throw new AppError('Token inválido ou expirado', 401)
    }
  }
}