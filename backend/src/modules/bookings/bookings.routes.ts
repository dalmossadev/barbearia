// src/modules/bookings/bookings.routes.ts

import { Router } from 'express'
import { BookingsController } from './bookings.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const bookingsRoutes = Router()
const bookingsController = new BookingsController()

// Todas as rotas de agendamento são protegidas por JWT
bookingsRoutes.use(AuthMiddleware.handle)

bookingsRoutes.post('/', bookingsController.create)
bookingsRoutes.get('/', bookingsController.findAll)
bookingsRoutes.get('/:id', bookingsController.findById)
bookingsRoutes.delete('/:id', bookingsController.cancel)

export default bookingsRoutes
