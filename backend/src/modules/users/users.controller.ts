// src/modules/users/users.controller.ts

import { Request, Response, NextFunction } from 'express'
import { UsersService } from './users.service'

export class UsersController {
  private readonly usersService: UsersService

  constructor() {
    this.usersService = new UsersService()
  }

  public me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.usersService.findById(req.userId)

      res.status(200).json({
        status: 'success',
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }
}
