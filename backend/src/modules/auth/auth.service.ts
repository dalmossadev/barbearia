// src/modules/auth/auth.service.ts

import jwt from 'jsonwebtoken'
import { AppError } from '../../shared/errors/AppError'
import { HashUtil } from '../../shared/utils/hash'
import { env } from '../../config/env'
import { UsersService } from '../users/users.service'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'
import { User } from '../../entities/user.entity'

interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}

export class AuthService {
  private readonly usersService: UsersService

  constructor() {
    this.usersService = new UsersService()
  }

  public async register(data: RegisterDTO): Promise<AuthResponse> {
    const user = await this.usersService.create(data)
    const token = this.generateToken(user.id)
    return { user, token }
  }

  public async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(data.email)

    if (!user) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const passwordMatch = await HashUtil.compare(data.password, user.password)

    if (!passwordMatch) {
      throw new AppError('E-mail ou senha inválidos', 401)
    }

    const token = this.generateToken(user.id)
    const { password: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  public async findUserById(id: string): Promise<Omit<User, 'password'>> {
    return this.usersService.findById(id)
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    )
  }
}