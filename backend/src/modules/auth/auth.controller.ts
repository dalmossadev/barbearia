// src/modules/auth/auth.controller.ts

import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'

export class AuthController {
  private readonly authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, email, password } = req.body as RegisterDTO

      if (!name || !email || !password) {
        res.status(400).json({
          status: 'error',
          message: 'Nome, e-mail e senha são obrigatórios',
        })
        return
      }

      const result = await this.authService.register({ name, email, password })

      res.status(201).json({
        status: 'success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body as LoginDTO

      if (!email || !password) {
        res.status(400).json({
          status: 'error',
          message: 'E-mail e senha são obrigatórios',
        })
        return
      }

      const result = await this.authService.login({ email, password })

      res.status(200).json({
        status: 'success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId } = req

      const authService = new AuthService()
      const usersService = authService['usersService']
      const user = await usersService.findById(userId)

      res.status(200).json({
        status: 'success',
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }
}