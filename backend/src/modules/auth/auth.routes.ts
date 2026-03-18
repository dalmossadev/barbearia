// src/modules/auth/auth.routes.ts

import { Router } from 'express'
import { AuthController } from './auth.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const authRoutes = Router()
const authController = new AuthController()

// Rotas públicas
authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)

// Rotas protegidas
authRoutes.get('/me', AuthMiddleware.handle, authController.me)

export default authRoutes