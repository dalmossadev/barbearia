#!/bin/bash

echo "🚀 Preenchendo arquivos da Sprint 2..."

# ─── auth.service.ts ──────────────────────────────────
cat > src/modules/auth/auth.service.ts << 'EOF'
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
    return jwt.sign({ sub: userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    })
  }
}
EOF
echo "  ✅ auth.service.ts"

# ─── users.controller.ts ──────────────────────────────
cat > src/modules/users/users.controller.ts << 'EOF'
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
EOF
echo "  ✅ users.controller.ts"

# ─── users.routes.ts ──────────────────────────────────
cat > src/modules/users/users.routes.ts << 'EOF'
// src/modules/users/users.routes.ts

import { Router } from 'express'
import { UsersController } from './users.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const usersRoutes = Router()
const usersController = new UsersController()

// Todas as rotas de usuário são protegidas
usersRoutes.get('/me', AuthMiddleware.handle, usersController.me)

export default usersRoutes
EOF
echo "  ✅ users.routes.ts"

echo ""
echo "✅ Sprint 2 — arquivos preenchidos com sucesso!"
echo ""
echo "📁 Verificando arquivos vazios restantes (sprints futuras):"
find src/ -type f -empty | sort