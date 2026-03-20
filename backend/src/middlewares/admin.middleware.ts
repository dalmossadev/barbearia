// src/middlewares/admin.middleware.ts

import { Request, Response, NextFunction } from 'express'
import { AppError } from '../shared/errors/AppError'
import { UsersRepository } from '../modules/users/users.repository'
import { UserRole } from '../entities/user.entity'

export class AdminMiddleware {
  public static handle = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId } = req

      const usersRepository = new UsersRepository()
      const user = await usersRepository.findById(userId)

      if (!user || user.role !== UserRole.ADMIN) {
        throw new AppError('Acesso restrito a administradores', 403)
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
