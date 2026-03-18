// src/modules/users/users.routes.ts

import { Router } from 'express'
import { UsersController } from './users.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const usersRoutes = Router()
const usersController = new UsersController()

// Todas as rotas de usuário são protegidas
usersRoutes.get('/me', AuthMiddleware.handle, usersController.me)

export default usersRoutes
